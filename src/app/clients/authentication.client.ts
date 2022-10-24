import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthenticationClient {
  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<any> {
    return this.http.post(
      environment.apiUrl + "/users/login",
      {
        username: username,
        password: password,
      },
      { responseType: "json" }
    );
  }

  public register(
    username: string,
    fullname: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.http.post(
      environment.apiUrl + "/users/register",
      {
        username: username,
        fullname: fullname,
        mail: email,
        password: password,
      },
      { responseType: "json" }
    );
  }
}
