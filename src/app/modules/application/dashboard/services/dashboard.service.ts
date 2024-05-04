import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiWrapper } from 'src/app/shared/models/api-wrapper.model';
import { environment } from 'src/environments/environment';
import { DashboardResp } from '../models/dashboard-resp.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiURL = environment.apiUrl;
  token = environment.token;
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  
  constructor(private httpClient: HttpClient) { }

  getData() {
    return this.httpClient
      .get<ApiWrapper<DashboardResp>>(`${this.apiURL}dashboard`, { headers: this.headers })
      .pipe(map((res) => res.data));
  }
}
