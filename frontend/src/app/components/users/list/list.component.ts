import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListUserComponent implements OnInit {


  users;


  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers(){
    await this.apiService.getUsers().subscribe(res =>{
      this.users = res;
    });
  }


  handleDelete(userID): void {
    this.apiService.deleteUser(userID).subscribe(() =>{
      this.loadUsers();
    });

  };

 }
