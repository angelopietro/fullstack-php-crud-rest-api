import { Injectable, Output, EventEmitter } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";

import { environment } from "src/environments/environment";
import { map, tap } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Login } from "../interfaces/login";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  @Output() getLoggedIn: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) {}

  redirectUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: environment.AUTH_KEY
    })
  };

  userLogin(username, password): Observable<Login> {
    return this.httpClient
      .post<Login>(
        environment.BASE_URL + "/auth/login",
        { username, password },
        this.httpOptions
      )
      .pipe(
        tap(res => {
          localStorage.setItem("user_logged_id", res.id);
          localStorage.setItem("user_logged_name", res.name);
          localStorage.setItem("access_token", res.token);
          this.getLoggedIn.emit(true);
          return res;
        })
      );
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError("Something bad happened; please try again later.");
  }

  getToken() {
    return localStorage.getItem("access_token");
  }

  isLoggedIn() {
    const userToken = this.getToken();
    if (userToken != null) {
      return true;
    }
    return false;
  }
}
