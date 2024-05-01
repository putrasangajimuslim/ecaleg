import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AbsenList, AbsenResp } from '../models/absen-resp.model';

@Injectable({
  providedIn: 'root'
})
export class AbsenService {

  apiURL = environment.apiUrl;
  token = environment.token;
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  
  constructor(private httpClient: HttpClient) { }

  getAbsen() {
    return this.httpClient
      .get<AbsenList>(`${this.apiURL}absen`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  getUsers() {
    return this.httpClient
      .get<AbsenList>(`${this.apiURL}partai`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  add(data: FormData) {
    return this.httpClient.post<AbsenResp>(this.apiURL+ 'calon/add', data, { headers: this.headers });
  }

  edit(id: string, data: FormData) {
    return this.httpClient.patch(`${this.apiURL}calon/${id}`, data, { headers: this.headers });
  }

  del(id: string) {
    return this.httpClient.delete(`${this.apiURL}calon/${id}`, { headers: this.headers });
  }
}
