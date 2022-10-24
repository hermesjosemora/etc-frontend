import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationClient } from "../clients/authentication.client";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private tokenKey = "token";

  constructor(
    private authenticationClient: AuthenticationClient,
    private router: Router
  ) {}

  public login(username: string, password: string): void {
    this.authenticationClient
      .login(username, password)
      .subscribe((response) => {
        if (response.result) {
          this.router.navigate(["/"]);
          localStorage.setItem(this.tokenKey, response.token);
        } else {
          Swal.fire("ERROR", response.message, "error");
        }
      });
  }

  public register(
    username: string,
    fullname: string,
    email: string,
    password: string
  ): void {
    this.authenticationClient
      .register(username, fullname, email, password)
      .subscribe((response) => {
        if (response.result) {
          this.router.navigate(["/login"]);
        } else {
          Swal.fire("ERROR", response.message, "error");
        }
      });
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(["/login"]);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}
