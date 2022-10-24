import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../services/authentication.service";
import { ReactiveFormsModule } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"],
})
export class LoginPageComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }

  public onSubmit() {
    if (
      this.loginForm.get("username")!.value != "" &&
      this.loginForm!.get("password")!.value != ""
    ) {
      this.authenticationService.login(
        this.loginForm.get("username")!.value,
        this.loginForm!.get("password")!.value
      );
    } else {
      Swal.fire("ERROR", "Debe llenar todos los datos", "error");
    }
  }
}
