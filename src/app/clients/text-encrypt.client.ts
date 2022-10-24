import { environment } from "./../../environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TextEncryptClient {
  constructor(private http: HttpClient) {}

  public encrypText(text: string): Observable<any> {
    return this.http.post(
      environment.apiUrl + "/users/encryp_text",
      {
        text: text,
      },
      { responseType: "json" }
    );
  }

  public textList(): Observable<any> {
    return this.http.get(environment.apiUrl + "/users/text_list", {
      responseType: "json",
    });
  }
}
