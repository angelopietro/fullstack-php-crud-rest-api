import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from '@angular/material';
import { DialogConfirmModel , DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';

@Component({
  selector: "app-user-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.less"]
})
export class ListUserComponent implements OnInit {
  users;
  result: string = '';
  loading = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    this.loading = true;
    await this.apiService.getUsers().subscribe(res => {
      this.users = res;
      this.loading = false;
    });
  }


  handleDelete(userID): void {
    this.apiService.deleteUser(userID).subscribe(() => {
      this.loadUsers();
      this.toastr.success("Usuário excluído com sucesso!", "Parabéns!");
    });
  }


  confirmDialog(userID): void {
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
        this.handleDelete(userID);
      }

    });
  }

}
