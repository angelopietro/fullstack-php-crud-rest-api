import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService, private httpClient: HttpClient) { }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this.toastr.success('Você saiu do sistema!');
    this.router.navigate(['/login']);
    return this.httpClient.post(environment.BASE_URL +'/auth/logout', '');
  }

}
