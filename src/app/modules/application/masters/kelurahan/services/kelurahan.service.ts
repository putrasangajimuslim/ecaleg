import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KecamatanList } from '../../kecamatan/models/kecamatan-resp.model';
import { KelurahanReq } from '../models/kelurahan-req.model';
import { KelurahanList, KelurahanResp } from '../models/kelurahan-resp.model';

@Injectable({
  providedIn: 'root'
})
export class KelurahanService {

  apiKelurahanURL =  environment.apiUrl;
  token = environment.token;
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  
  constructor(private httpClient: HttpClient) { }

  getKelurahan() {
    return this.httpClient
      .get<KelurahanList>(`${this.apiKelurahanURL}kelurahan`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  getKodeKecamatan() {
    return this.httpClient
      .get<KecamatanList>(`${this.apiKelurahanURL}kecamatan`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  addKelurahan(data: KelurahanReq) {
    return this.httpClient.post<KelurahanResp>(this.apiKelurahanURL+ 'kelurahan/add', data, { headers: this.headers });
  }

  editKelurahan(id: string, data: KelurahanReq) {
    return this.httpClient.patch(`${this.apiKelurahanURL}kelurahan/${id}`, data, { headers: this.headers });
  }

  delKelurahan(id: string) {
    return this.httpClient.delete(`${this.apiKelurahanURL}kelurahan/${id}`, { headers: this.headers });
  }
}
