import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiWrapper } from 'src/app/shared/models/api-wrapper.model';
import { environment } from 'src/environments/environment';
import { LoginFirstResp } from '../models/login-first-resp.model';
import { LoginRequest } from '../models/login-req.model';
import { LoginResp } from '../models/login-resp.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.apiUrl+'account/auth/';
  constructor(private httpClient: HttpClient) { }

  loginFirst(req: LoginRequest) {
    return this.httpClient
          .post<ApiWrapper<LoginFirstResp>>(`${this.apiURL}login`, req)
          .pipe(map((res) => res.data));
  }

  loginSecond(req: LoginRequest) {
    return this.httpClient
          .post<ApiWrapper<LoginResp>>(`${this.apiURL}login/user`, req)
          .pipe(map((res) => res.data));
  }
}
