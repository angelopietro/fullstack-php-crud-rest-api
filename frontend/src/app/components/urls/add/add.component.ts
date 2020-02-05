import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';

import { Url } from '../../../interfaces/url';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddUrlComponent implements OnInit {
urlForm: FormGroup;
url: Url[];

constructor(
  private apiService: ApiService,
  private formBuilder: FormBuilder,
  private router: Router,
  private toastr: ToastrService) { }

ngOnInit() {

  this.urlForm = this.formBuilder.group({
    title: ['', Validators.required],
    url: ['', Validators.required]
  });

}

handleSubmit(): void {
  if (this.urlForm.invalid) {
    return;
  }

  const formPayload = {
    id: null,
    user_id: 1,
    title: this.urlForm.controls.title.value,
    url: this.urlForm.controls.url.value,
    status: null,
    created_at: null,
    updated_at: null
  }

    this.apiService.createUrl(this.urlForm.value)
    .subscribe(() => {
      this.toastr.success('Url cadastrada com sucesso!', 'Parabéns!');
      this.router.navigate(["/urls"]);
    });
  }
}
