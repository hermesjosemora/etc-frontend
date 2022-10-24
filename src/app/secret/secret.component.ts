import { TextEncryptClient } from "./../clients/text-encrypt.client";
import { AuthenticationService } from "./../services/authentication.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from "sweetalert2";

interface LISTTEXT {
  id: number;
  text: string;
}

@Component({
  selector: "app-secret",
  templateUrl: "./secret.component.html",
  styleUrls: ["./secret.component.css"],
})
export class SecretComponent implements OnInit {
  public textEncryptForm!: FormGroup;
  public convertido: LISTTEXT[];
  constructor(
    private authenticationService: AuthenticationService,
    private textEncryptClient: TextEncryptClient
  ) {
    this.convertido = [];
  }

  ngOnInit(): void {
    this.textEncryptForm = new FormGroup({
      textToEncrypt: new FormControl("", Validators.required),
    });
    this.textList();
  }

  logout(): void {
    this.authenticationService.logout();
  }

  public onSubmit() {
    console.log("1");
    if (this.textEncryptForm.get("textToEncrypt")!.value != "") {
      this.textToEncrypt(this.textEncryptForm.get("textToEncrypt")!.value);
    } else {
      Swal.fire("ERROR", "Debe llenar todos los datos", "error");
    }
  }

  public textToEncrypt(text: string): void {
    this.textEncryptClient.encrypText(text).subscribe((response) => {
      if (response.result) {
        Swal.fire("OK", "Frase encriptada y guardada correctamente", "success");
        this.textList();
      } else {
        Swal.fire("ERROR", response.message, "error");
      }
    });
  }

  public textList(): void {
    this.textEncryptClient.textList().subscribe((response) => {
      if (response.result) {
        console.log(response.textForUsersList);
        this.convertido = response.textForUsersList;
        console.log(this.convertido);
      } else {
        Swal.fire("ERROR", response.message, "error");
      }
    });
  }
}
