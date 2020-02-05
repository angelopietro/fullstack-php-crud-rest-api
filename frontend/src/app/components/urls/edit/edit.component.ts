import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { ApiService } from "../../../services/api.service";
import { ToastrService } from "ngx-toastr";

import { Url } from "../../../interfaces/url";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.less"]
})
export class EditUrlComponent implements OnInit {
  urlForm: FormGroup;
  url: Url[];

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.params["id"];

    this.urlForm = this.formBuilder.group({
      id: [""],
      title: ["", Validators.required],
      url: ["", Validators.required],
      status: [""],
      created_at: [""],
      updated_at: [""]
    });

    this.apiService.getUrlByID(id).subscribe(data => {
      this.urlForm.setValue(data);
    });
  }

  handleSubmit() {
    this.apiService
      .updateUrl(this.urlForm.value)
      .pipe(first())
      .subscribe(() => {
        this.toastr.success("Url atualizada com sucesso!", "Parabéns!");
        this.router.navigate(["/urls"]);
      });
  }
}
