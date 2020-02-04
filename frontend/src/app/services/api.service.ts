import { Injectable } from '@angular/core';
import { Observable } from  'rxjs';
import { HttpClient } from '@angular/common/http';

import { Url } from '../interfaces/url';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  PHP_API_SERVER = "api";

  constructor(private httpClient: HttpClient) { }

  //URLS
  getUrls(): Observable<Url[]>{
    return this.httpClient.get<Url[]>(environment.BASE_URL + `/urls`);
  }

  getUrlByID(id: number): Observable<Url> {
      return this.httpClient.get<Url>(environment.BASE_URL + `/urls/${id}`);
  }


  getUrlLog(id: number): Observable<Url> {
    return this.httpClient.get<Url>(environment.BASE_URL + `/urls/log/${id}`);
  }


  createUrl(url: Url): Observable<Url>{

    return this.httpClient.post<Url>(environment.BASE_URL + `/urls`, url);
  }

  updateUrl(url: Url): Observable<Url>{

    return this.httpClient.put<Url>(environment.BASE_URL + `/urls/${url.id}`, url);
  }

  deleteUrl(id: number){
     return this.httpClient.delete<Url>(environment.BASE_URL + `/urls/${id}`);
  }

  //Users

  getUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(environment.BASE_URL + `/users`);
  }

  getUserByID(id: number): Observable<User> {
    return this.httpClient.get<User>(environment.BASE_URL + `/users/${id}`);
  }


  createUser(user: User): Observable<User>{
    return this.httpClient.post<User>(environment.BASE_URL + `/users`, user);
  }

  updateUser(user: User){
    return this.httpClient.put<User>(environment.BASE_URL + `/users/${user.id}`, user);
  }

  deleteUser(id: number){
    return this.httpClient.delete<User>(environment.BASE_URL + `/users/${id}`);
  }

}
