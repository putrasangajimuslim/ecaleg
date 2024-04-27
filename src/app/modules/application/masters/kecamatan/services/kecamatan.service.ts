import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KabupatenList } from '../../kabupaten/models/kabupaten-resp.model';
import { KecamatanReq } from '../models/kecamatan-req.model';
import { KecamatanList, KecamatanResp } from '../models/kecamatan-resp.model';

@Injectable({
  providedIn: 'root'
})
export class KecamatanService {

  apiKecamatanURL = environment.apiUrl;
  token = environment.token;
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  
  constructor(private httpClient: HttpClient) { }

  getKecamatan() {
    return this.httpClient
      .get<KecamatanList>(`${this.apiKecamatanURL}kecamatan`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  getKodeKabupaten() {
    return this.httpClient
      .get<KabupatenList>(`${this.apiKecamatanURL}kabupaten`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  addKecamatan(data: KecamatanReq) {
    return this.httpClient.post<KecamatanResp>(this.apiKecamatanURL+ 'kecamatan/add', data, { headers: this.headers });
  }

  editKecamatan(id: string, data: KecamatanReq) {
    return this.httpClient.patch(`${this.apiKecamatanURL}kecamatan/${id}`, data, { headers: this.headers });
  }

  delKecamatan(id: string) {
    return this.httpClient.delete(`${this.apiKecamatanURL}kecamatan/${id}`, { headers: this.headers });
  }
  
}
