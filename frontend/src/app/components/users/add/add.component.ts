import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { ApiService } from '../../../services/api.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-user-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  user: User[];

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {

    this.userForm = this.formBuilder.group({
      id: '',
      name: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  handleSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    const formPayload = {

      name: this.userForm.controls.name.value,
      email: this.userForm.controls.email.value,
      username: this.userForm.controls.username.value,
      password: this.userForm.controls.password.value,


    }

      this.apiService.createUser(this.userForm.value)
      .subscribe(() => {
        //console.log(formPayload);
        this.router.navigate(["/users"])
      });
    }
  }
