import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ApiService } from "../../../services/api.service";
import { ToastrService } from "ngx-toastr";
import { User } from "../../../interfaces/user";

@Component({
  selector: "app-user-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.less"]
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  user: User[];

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.params["id"];

    this.userForm = this.formBuilder.group({
      id: [""],
      name: ["", Validators.required],
      email: ["", Validators.required],
      username: ["", Validators.required],
      password: null,
      last_login: [""],
      created_at: [""],
      updated_at: [""]
    });

    this.apiService.getUserByID(id).subscribe(data => {

      const formPayload = {
        id: data.id,
        username: data.username,
        name: data.name,
        email: data.email,
        password: "",
        last_login: data.last_login,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };


      this.userForm.setValue(formPayload);
    });
  }

  handleSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    const formPayload = {
      id: this.userForm.controls.id.value,
      name: this.userForm.controls.name.value,
      email: this.userForm.controls.email.value,
      username: this.userForm.controls.username.value,
      password: this.userForm.controls.password.value
    };

    this.apiService.updateUser(formPayload).subscribe(() => {
      this.toastr.success(
        "Dados do usuário atualizados com sucesso!",
        "Parabéns!"
      );
      this.router.navigate(["/users"]);
    });
  }



}
