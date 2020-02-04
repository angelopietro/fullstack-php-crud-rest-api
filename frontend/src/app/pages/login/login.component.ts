import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,

  ) { }

  loginForm: FormGroup;
  isSubmitted = false;
  loading = false;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formControls() { return this.loginForm.controls; }

  onLogin() {
    this.isSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.userLogin(this.formControls.username.value, this.formControls.password.value)
      .pipe(first())
      .subscribe(
        data => {
         // this.alertaService.success('Autenticação realizada com sucesso!');
          this.loading = false;
          const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/dashboard';
          this.router.navigate([redirect]);


        },
        error => {

        //  this.alertaService.error('Usuário ou senha inválida!', 'Oops!');
        console.log('eeerr');
          this.loading = false;
        });
  }

  get email() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
  }



/*
  this.dataService.userlogin(angForm1.value.email,angForm1.value.password)
      .pipe(first())
      .subscribe(
          data => {
                const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/dashboard';
                this.router.navigate([redirect]);

          },
          error => {
              alert("User name or password is incorrect")
          });
*/
