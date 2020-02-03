import { Component, OnInit } from '@angular/core';

import { ApiService} from '../../services/api.service';
import { Url } from '../../interfaces/url';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  urls:  Url[];


  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadUrls();
  }

  async loadUrls(){
    await this.apiService.getUrls().subscribe(res =>{
      this.urls = res;
      console.log(res);
    })
  }

}
