import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Url } from "../interfaces/url";
import { User } from "../interfaces/user";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: environment.AUTH_KEY
    })
  };

  constructor(private httpClient: HttpClient) {}

  //CHECK URLS
  checkUrls() {
    return this.httpClient.get(
      environment.BASE_URL + `/check`,
      this.httpOptions
    );
  }

  //URLS
  getUrls(): Observable<Url[]> {
    return this.httpClient.get<Url[]>(
      environment.BASE_URL + `/urls`,
      this.httpOptions
    );
  }

  getUrlsByUser(): Observable<Url[]> {
    return this.httpClient.get<Url[]>(
      environment.BASE_URL + `/urls/user/${localStorage.getItem('user_logged_id')}`,
      this.httpOptions
    );
  }


  getUrlByID(id: number): Observable<Url> {
    return this.httpClient.get<Url>(
      environment.BASE_URL + `/urls/${id}`,
      this.httpOptions
    );
  }

  getUrlLog(id: number): Observable<Url> {
    return this.httpClient.get<Url>(
      environment.BASE_URL + `/urls/log/${id}`,
      this.httpOptions
    );
  }

  createUrl(url: Url): Observable<Url> {
    return this.httpClient.post<Url>(
      environment.BASE_URL + `/urls`,
      url,
      this.httpOptions
    );
  }

  updateUrl(url: Url): Observable<Url> {
    return this.httpClient.put<Url>(
      environment.BASE_URL + `/urls/${url.id}`,
      url,
      this.httpOptions
    );
  }

  deleteUrl(id: number) {
    return this.httpClient.delete<Url>(
      environment.BASE_URL + `/urls/${id}`,
      this.httpOptions
    );
  }

  //Users

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(
      environment.BASE_URL + `/users`,
      this.httpOptions
    );
  }

  getUserByID(id: number): Observable<User> {
    return this.httpClient.get<User>(
      environment.BASE_URL + `/users/${id}`,
      this.httpOptions
    );
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(
      environment.BASE_URL + `/users`,
      user,
      this.httpOptions
    );
  }

  updateUser(user: User) {
    return this.httpClient.put<User>(
      environment.BASE_URL + `/users/${user.id}`,
      user,
      this.httpOptions
    );
  }

  deleteUser(id: number) {
    return this.httpClient.delete<User>(
      environment.BASE_URL + `/users/${id}`,
      this.httpOptions
    );
  }
}
