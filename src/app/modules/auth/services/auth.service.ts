import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiWrapper } from 'src/app/shared/models/api-wrapper.model';
import { LoginRequest } from '../models/login-req.model';
import { LoginResp } from '../models/login-resp.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = 'http://103.127.99.172:3000/api/v1/account/auth/';
  constructor(private httpClient: HttpClient) { }

  login(req: LoginRequest) {
    return this.httpClient
          .post<ApiWrapper<LoginResp>>(`${this.apiURL}login/user`, req)
          .pipe(map((res) => res.data));
  }
}
