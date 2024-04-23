import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiWrapper } from 'src/app/shared/models/api-wrapper.model';
import { KabupatenList } from '../../kabupaten/models/kabupaten-resp.model';
import { AddKecamatanResp, KecamatanList } from '../models/kecamatan-resp.model';

@Injectable({
  providedIn: 'root'
})
export class KecamatanService {

  apiKecamatanURL = 'http://localhost:4000/api/';
  
  constructor(private httpClient: HttpClient) { }

  getKecamatan() {
    return this.httpClient
      .get<ApiWrapper<KecamatanList>>(`${this.apiKecamatanURL}kecamatan`)
      .pipe(map((res) => res.data));
  }

  getKodeKabupaten() {
    return this.httpClient
      .get<ApiWrapper<KabupatenList>>(`${this.apiKecamatanURL}kabupaten`)
      .pipe(map((res) => res.data));
  }

  addKecamatan(data: AddKecamatanResp) {
    return this.httpClient.post<AddKecamatanResp>(this.apiKecamatanURL+ 'kecamatan/add', data);
  }

  editKecamatan(data: AddKecamatanResp) {
    return this.httpClient.post<AddKecamatanResp>(this.apiKecamatanURL+ 'kecamatan/update', data);
  }

  delKecamatan(data: AddKecamatanResp) {
    return this.httpClient.post<AddKecamatanResp>(this.apiKecamatanURL+ 'kecamatan/delete', data);
  }
  
}
