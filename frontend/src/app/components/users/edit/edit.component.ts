import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { ApiService } from '../../../services/api.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditUserComponent implements OnInit {

  userForm: FormGroup;
  user: User[];

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {

    let id = this.route.snapshot.params["id"];

    this.userForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: '',
      last_login: [''],
      created_at: [''],
      updated_at: [''],
    });


    this.apiService.getUserByID(id)
    .subscribe( data => {
      this.userForm.setValue(data);
      console.log(data);
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
      password: this.userForm.controls.password.value,


    }

      this.apiService.updateUser(formPayload)
      .subscribe(() => {
        //console.log(formPayload);
        this.router.navigate(["/users"])
      });
    }
}
