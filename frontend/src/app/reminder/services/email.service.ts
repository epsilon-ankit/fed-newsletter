import { Injectable } from '@angular/core';
import { HttpService } from "../../shared/http/http.service";

@Injectable({
  providedIn: 'root'
})

export class EmailService {

  constructor(public httpClient: HttpService) {}

  sendMessage(body){
    return this.httpClient.post("send", body, {});
  }
}
