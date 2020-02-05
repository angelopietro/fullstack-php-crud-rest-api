import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-url-preview",
  templateUrl: "./preview.component.html",
  styleUrls: ["./preview.component.less"]
})
export class PreviewUrlComponent implements OnInit {
  logs: string;
  msg: string;
  title: string;
  url: string;
  code: string;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    let id = this.route.snapshot.params["id"];

    this.apiService.getUrlLog(id).subscribe(data => {
      this.title = data.title;
      this.url = data.url;
      this.code = data.response_code;
      this.msg = JSON.parse(data.response_msg);
    });
  }
}
