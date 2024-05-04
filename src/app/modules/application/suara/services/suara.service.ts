import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CalonList } from '../../calon/models/calon-resp.model';
import { KabupatenResp } from '../../masters/kabupaten/models/kabupaten-resp.model';
import { PartaiList } from '../../masters/partai/models/partai-resp.model';
import { SuaraList, SuaraResp } from '../models/suara-resp.model';

@Injectable({
  providedIn: 'root'
})
export class SuaraService {

  apiURL = environment.apiUrl;
  token = environment.token;
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  
  constructor(private httpClient: HttpClient) { }

  getSuara() {
    return this.httpClient
      .get<SuaraList>(`${this.apiURL}suara`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  getSuaraOne(id) {
    return this.httpClient
      .get<SuaraList>(`${this.apiURL}suara/${id}`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  getKabupaten(id: string) {
    return this.httpClient
      .get<KabupatenResp>(`${this.apiURL}kabupaten/${id}`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  getPartai() {
    return this.httpClient
      .get<PartaiList>(`${this.apiURL}calon`, { headers: this.headers })
      .pipe(map((res) => res));
  }


  getAllCalon() {
    return this.httpClient
      .get<CalonList>(`${this.apiURL}calon/question/all`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  add(data: FormData) {
    return this.httpClient.post<SuaraResp>(this.apiURL+ 'suara/input-suara', data, { headers: this.headers });
  }

  edit(id: string, data: FormData) {
    return this.httpClient.patch(`${this.apiURL}suara/${id}`, data, { headers: this.headers });
  }

  del(id: string) {
    return this.httpClient.delete(`${this.apiURL}suara/${id}`, { headers: this.headers });
  }
}
