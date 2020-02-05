import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
  userName: string;
  constructor(private router: Router, private toastr: ToastrService, private httpClient: HttpClient) { }

  ngOnInit() {
   this.userName = localStorage.getItem('user_logged_name');
  }

  logout() {
    localStorage.clear();
    this.toastr.success('Você saiu do sistema!');
    this.router.navigate(['/login']);
  }

}
