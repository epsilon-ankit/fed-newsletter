import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class SendmailService {

  constructor(public httpClient: HttpService) { }

  send(data) {
    return this.httpClient.post('send', data, {})
  }
}
