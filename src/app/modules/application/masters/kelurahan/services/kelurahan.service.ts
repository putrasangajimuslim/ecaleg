import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiWrapper } from 'src/app/shared/models/api-wrapper.model';
import { KecamatanList } from '../../kecamatan/models/kecamatan-resp.model';
import { KelurahanList, KelurahanResp } from '../models/kelurahan-resp.model';

@Injectable({
  providedIn: 'root'
})
export class KelurahanService {

  apiKecamatanURL = 'http://localhost:4000/api/';
  
  constructor(private httpClient: HttpClient) { }

  getKelurahan() {
    return this.httpClient
      .get<ApiWrapper<KelurahanList>>(`${this.apiKecamatanURL}kelurahan`)
      .pipe(map((res) => res.data));
  }

  getKodeKecamatan() {
    return this.httpClient
      .get<ApiWrapper<KecamatanList>>(`${this.apiKecamatanURL}kecamatan`)
      .pipe(map((res) => res.data));
  }

  addKelurahan(data: KelurahanResp) {
    return this.httpClient.post<KelurahanResp>(this.apiKecamatanURL+ 'kelurahan/add', data);
  }

  editKelurahan(data: KelurahanResp) {
    return this.httpClient.post<KelurahanResp>(this.apiKecamatanURL+ 'kelurahan/update', data);
  }

  delKelurahan(data: KelurahanResp) {
    return this.httpClient.post<KelurahanResp>(this.apiKecamatanURL+ 'kelurahan/delete', data);
  }
}
