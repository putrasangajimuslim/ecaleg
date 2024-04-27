import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KelurahanList } from '../../masters/kelurahan/models/kelurahan-resp.model';
import { TpsReq } from '../models/tps-req.model';
import { TpsList, TpsResp } from '../models/tps-resp.model';

@Injectable({
  providedIn: 'root'
})
export class TpsService {

  apiTpsURL = environment.apiUrl;
  token = environment.token;
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  
  constructor(private httpClient: HttpClient) { }

  getTPS() {
    return this.httpClient
      .get<TpsList>(`${this.apiTpsURL}tps`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  getKelurahan() {
    return this.httpClient
      .get<KelurahanList>(`${this.apiTpsURL}kelurahan`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  add(data: TpsReq) {
    return this.httpClient.post<TpsResp>(this.apiTpsURL+ 'tps/add', data, { headers: this.headers });
  }

  edit(id: string, data: TpsReq) {
    return this.httpClient.patch(`${this.apiTpsURL}tps/${id}`, data, { headers: this.headers });
  }

  del(id: string) {
    return this.httpClient.delete(`${this.apiTpsURL}tps/${id}`, { headers: this.headers });
  }
}