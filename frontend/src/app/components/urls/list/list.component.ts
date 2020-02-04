import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Url } from '../../../interfaces/url';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListUrlComponent implements OnInit {

  urls;


  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadUrls();
  }

  async loadUrls(){
    await this.apiService.getUrls().subscribe(res =>{
      this.urls = res;
    });
  }


  handleDelete(urlID): void {
    this.apiService.deleteUrl(urlID).subscribe(() =>{
      this.loadUrls();
    });

  };


}
