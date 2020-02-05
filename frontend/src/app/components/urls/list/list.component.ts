import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  ChangeDetectorRef
} from "@angular/core";
import { Subscription, Observable, timer } from "rxjs";
import { ApiService } from "src/app/services/api.service";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.less"]
})
export class ListUrlComponent implements OnInit {
  private subscription: Subscription;
  @Output() TimerExpired: EventEmitter<any> = new EventEmitter<any>();

  @Input() SearchDate: moment.Moment = moment();
  @Input() ElapsTime: number = 0.3;

  searchEndDate: moment.Moment;
  remainingTime: number;
  minutes: number;
  seconds: number;
  status: any;
  urls;

  everySecond: Observable<number> = timer(0, 1000);

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private ref: ChangeDetectorRef
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

        this.apiService.checkUrls().subscribe(res => {
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
    await this.apiService.getUrls().subscribe(res => {
      this.urls = res;
    });
  }

  handleDelete(urlID): void {
    this.apiService.deleteUrl(urlID).subscribe(() => {
      this.loadUrls();
      this.toastr.success("Url excluída com sucesso!", "Parabéns!");
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
