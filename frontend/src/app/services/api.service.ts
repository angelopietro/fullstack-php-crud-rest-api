import { Injectable } from '@angular/core';
import { Observable } from  'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { Url } from '../interfaces/url';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  PHP_API_SERVER = "http://localhost/challengeway/backend";

  constructor(private httpClient: HttpClient) { }

  //URLS
  getUrls(): Observable<Url[]>{
    return this.httpClient.get<Url[]>(`${this.PHP_API_SERVER}/urls`);
  }


  getUrlByID(id: number): Observable<Url> {
      return this.httpClient.get<Url>(`${this.PHP_API_SERVER}/urls/${id}`);
    }


  createUrl(url: Url): Observable<Url>{

    return this.httpClient.post<Url>(`${this.PHP_API_SERVER}/urls`, url);
  }

  updateUrl(url: Url): Observable<Url>{

    return this.httpClient.put<Url>(`${this.PHP_API_SERVER}/urls/${url.id}`, url);
  }

  deleteUrl(id: number){
     return this.httpClient.delete<Url>(`${this.PHP_API_SERVER}/urls/${id}`);
  }

  //Users

  getUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.PHP_API_SERVER}/users`);
  }

  createUser(user: User): Observable<User>{
    return this.httpClient.post<User>(`${this.PHP_API_SERVER}/users`, user);
  }

  updateUser(user: User, id: number){
    return this.httpClient.put<User>(`${this.PHP_API_SERVER}/users/${id}`, user);
  }

  deleteUser(id: number){
    return this.httpClient.delete<User>(`${this.PHP_API_SERVER}/users/${id}`);
  }

}
