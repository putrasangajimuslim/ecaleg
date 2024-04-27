import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResp } from '../models/login-resp.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = 'http://103.127.99.172:3000/api/v1/account/auth/';
  constructor(private httpClient: HttpClient) { }

  login(req: LoginResp) {
    return this.httpClient
          .post<LoginResp>(`${this.apiURL}login`, req);
  }
}
