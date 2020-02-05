import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.less"]
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  loginForm: FormGroup;
  isSubmitted = false;
  loading = false;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onLogin() {
    this.isSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .userLogin(
        this.formControls.username.value,
        this.formControls.password.value
      )
      .pipe(first())
      .subscribe(
        data => {
          this.toastr.success("Autenticação realizada com sucesso!");
          this.loading = false;
          const redirect = this.authService.redirectUrl
            ? this.authService.redirectUrl
            : "/dashboard";
          this.router.navigate([redirect]);
        },
        error => {
          this.toastr.error("Usuário ou senha inválida!", "Oops!");
          this.loading = false;
        }
      );
  }
}
