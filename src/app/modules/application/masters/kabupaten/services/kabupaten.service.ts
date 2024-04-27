import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KabupatenReq } from '../models/kabupaten-req.model';
import { KabupatenList, KabupatenResp } from '../models/kabupaten-resp.model';

@Injectable({
  providedIn: 'root'
})
export class KabupatenService {
  apiKabupatenURL = environment.apiUrl;
  token = environment.token;
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  
  constructor(private httpClient: HttpClient) { }

  getKabupaten() {
    return this.httpClient
      .get<KabupatenList>(`${this.apiKabupatenURL}kabupaten`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  addKabupaten(data: KabupatenReq) {
    return this.httpClient.post<KabupatenResp>(this.apiKabupatenURL+ 'kabupaten/add', data, { headers: this.headers });
  }

  editKabupaten(id: string, data: KabupatenReq) {
    return this.httpClient.patch(`${this.apiKabupatenURL}kabupaten/${id}`, data, { headers: this.headers });
  }

  delKabupaten(id: string) {
    return this.httpClient.delete(`${this.apiKabupatenURL}kabupaten/${id}`, { headers: this.headers });
  }
}
