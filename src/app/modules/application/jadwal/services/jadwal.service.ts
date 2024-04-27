import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JadwalReq } from '../models/jadwal-req.model';
import { JadwalList, JadwalResp } from '../models/jadwal-resp.model';

@Injectable({
  providedIn: 'root'
})
export class JadwalService {

  apiURL = environment.apiUrl;
  token = environment.token;
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  
  constructor(private httpClient: HttpClient) { }

  getData() {
    return this.httpClient
      .get<JadwalList>(`${this.apiURL}jadwal`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  add(data: JadwalReq) {
    return this.httpClient.post<JadwalResp>(this.apiURL+ 'jadwal/add', data, { headers: this.headers });
  }

  edit(id: string, data: JadwalReq) {
    return this.httpClient.patch(`${this.apiURL}jadwal/${id}`, data, { headers: this.headers });
  }

  del(id: string) {
    return this.httpClient.delete(`${this.apiURL}jadwal/${id}`, { headers: this.headers });
  }
}
