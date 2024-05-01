import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KabupatenList } from '../../masters/kabupaten/models/kabupaten-resp.model';
import { KecamatanList } from '../../masters/kecamatan/models/kecamatan-resp.model';
import { KelurahanList } from '../../masters/kelurahan/models/kelurahan-resp.model';
import { TpsList } from '../../tps/models/tps-resp.model';
import { TimReqData } from '../models/tim-req.model';
import { TimList, TimResp } from '../models/tim-resp.model';

@Injectable({
  providedIn: 'root'
})
export class TimService {
  apiURL = environment.apiUrl;
  token = environment.token;
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  
  constructor(private httpClient: HttpClient) { }

  getData() {
    return this.httpClient
      .get<TimList>(`${this.apiURL}panitia`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  getDataKabupaten() {
    return this.httpClient
      .get<KabupatenList>(`${this.apiURL}kabupaten`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  getDataKecamatan() {
    return this.httpClient
      .get<KecamatanList>(`${this.apiURL}kecamatan`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  getDataKelurahan() {
    return this.httpClient
      .get<KelurahanList>(`${this.apiURL}kelurahan`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  getDataTPS() {
    return this.httpClient
      .get<TpsList>(`${this.apiURL}tps`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  add(data: TimReqData) {
    return this.httpClient.post<TimResp>(this.apiURL+ 'account/auth/create/user', data, { headers: this.headers });
  }

  edit(id: string, data: any) {
    return this.httpClient.patch(`${this.apiURL}panitia/${id}`, data, { headers: this.headers });
  }

  del(id: string) {
    return this.httpClient.delete(`${this.apiURL}panitia/${id}`, { headers: this.headers });
  }
}
