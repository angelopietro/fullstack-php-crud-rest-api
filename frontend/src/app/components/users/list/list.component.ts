import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-user-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.less"]
})
export class ListUserComponent implements OnInit {
  users;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    await this.apiService.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  handleDelete(userID): void {
    this.apiService.deleteUser(userID).subscribe(() => {
      this.loadUsers();
      this.toastr.success("Usuário excluído com sucesso!", "Parabéns!");
    });
  }
}
