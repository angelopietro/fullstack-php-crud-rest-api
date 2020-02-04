import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) { }

  PHP_API_SERVER = "api";

  redirectUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Client-Service': 'frontend-client',
      'Auth-Key': 'simplerestapi',
      //'Authorization': 'my-auth-token'
    })
  };

  userLogin(username, password) {

    return this.httpClient.post<any>(environment.BASE_URL +'/auth/login', { username, password }, this.httpOptions)
        .pipe(tap(Usermodule => {
         //   this.setToken(Usermodule[0].token);
           this.getLoggedInName.emit(true);
          //  console.log(Usermodule);
            return Usermodule;
        }));
}

//token
setToken(token: string) {
  localStorage.setItem('token', token);
}

getToken() {
  return localStorage.getItem('token');
}

deleteToken() {
  localStorage.removeItem('token');
}

isLoggedIn() {
  const usertoken = this.getToken();
  if (usertoken != null) {
    return true
  }
  return false;
}

}
