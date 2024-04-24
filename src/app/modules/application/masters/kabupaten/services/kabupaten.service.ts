import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiWrapper } from 'src/app/shared/models/api-wrapper.model';
import { KabupatenList, KabupatenResp } from '../models/kabupaten-resp.model';

@Injectable({
  providedIn: 'root'
})
export class KabupatenService {
  apiKabupatenURL = 'http://localhost:4000/api/';
  
  constructor(private httpClient: HttpClient) { }

  getKabupaten() {
    return this.httpClient
      .get<ApiWrapper<KabupatenList>>(`${this.apiKabupatenURL}kabupaten`)
      .pipe(map((res) => res.data));
  }

  addKabupaten(data: KabupatenResp) {
    return this.httpClient.post<KabupatenResp>(this.apiKabupatenURL+ 'kabupaten/add', data);
  }

  editKecamatan(data: KabupatenResp) {
    return this.httpClient.post<KabupatenResp>(this.apiKabupatenURL+ 'kabupaten/update', data);
  }

  delKecamatan(data: KabupatenResp) {
    return this.httpClient.post<KabupatenResp>(this.apiKabupatenURL+ 'kabupaten/delete', data);
  }
}
