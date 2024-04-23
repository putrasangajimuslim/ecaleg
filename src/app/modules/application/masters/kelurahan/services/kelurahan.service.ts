import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiWrapper } from 'src/app/shared/models/api-wrapper.model';
import { KecamatanList } from '../../kecamatan/models/kecamatan-resp.model';
import { AddKelurahanResp, KelurahanList } from '../models/kelurahan-resp.model';

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

  addKelurahan(data: AddKelurahanResp) {
    return this.httpClient.post<AddKelurahanResp>(this.apiKecamatanURL+ 'kelurahan/add', data);
  }

  editKelurahan(data: AddKelurahanResp) {
    return this.httpClient.post<AddKelurahanResp>(this.apiKecamatanURL+ 'kelurahan/update', data);
  }

  delKelurahan(data: AddKelurahanResp) {
    return this.httpClient.post<AddKelurahanResp>(this.apiKecamatanURL+ 'kelurahan/delete', data);
  }
}
