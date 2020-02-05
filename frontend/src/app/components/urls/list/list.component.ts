import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  ChangeDetectorRef
} from "@angular/core";
import { Subscription, Observable, timer } from "rxjs";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { DialogConfirmModel, DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';

import { ApiService } from "src/app/services/api.service";
import { MatDialog } from '@angular/material';


@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.less"]
})
export class ListUrlComponent implements OnInit {
  private subscription: Subscription;
  @Output() TimerExpired: EventEmitter<any> = new EventEmitter<any>();

  @Input() SearchDate: moment.Moment = moment();
  @Input() ElapsTime: number = 0.5;

  searchEndDate: moment.Moment;
  remainingTime: number;
  minutes: number;
  seconds: number;
  result: string = '';
  loading = false;
  urls;

  everySecond: Observable<number> = timer(0, 1000);

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private ref: ChangeDetectorRef,
    public dialog: MatDialog
  ) {
    this.searchEndDate = this.SearchDate.add(this.ElapsTime, "minutes");
  }

  ngOnInit() {
    this.loadUrls();

    this.subscription = this.everySecond.subscribe(seconds => {
      var currentTime: moment.Moment = moment();
      this.remainingTime = this.searchEndDate.diff(currentTime);
      this.remainingTime = this.remainingTime / 1000;

      if (this.remainingTime <= 0) {
        this.SearchDate = moment();
        this.searchEndDate = this.SearchDate.add(this.ElapsTime, "minutes");

        this.TimerExpired.emit();

        this.apiService.checkUrls().subscribe((res: any) => {
          if (res.status === 200) {
            this.loadUrls();
          }
        });
      } else {
        this.minutes = Math.floor(this.remainingTime / 60);
        this.seconds = Math.floor(this.remainingTime - this.minutes * 60);
      }
      this.ref.markForCheck();
    });
  }

  async loadUrls() {
    this.loading = true;
    await this.apiService.getUrlsByUser().subscribe(res => {
      this.urls = res;
      this.loading = false;
    });
  }

  handleDelete(urlID): void {
    this.apiService.deleteUrl(urlID).subscribe(() => {
      this.loadUrls();
      this.toastr.success("Url excluída com sucesso!", "Parabéns!");
    });
  }

  confirmDialog(urlID): void {
    const title = 'Atenção!';
    const message = `Você realmente deseja eliminar este registro?`;

    const dialogData = new DialogConfirmModel(title, message);

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      maxWidth: "500px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;

      if (this.result) {
        this.handleDelete(urlID);
      }

    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
