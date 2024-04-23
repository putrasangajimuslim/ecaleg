import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiWrapper } from 'src/app/shared/models/api-wrapper.model';
import { AddKabupatenResp, KabupatenList } from '../models/kabupaten-resp.model';

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

  addKabupaten(data: AddKabupatenResp) {
    return this.httpClient.post<AddKabupatenResp>(this.apiKabupatenURL+ 'kabupaten/add', data);
  }

  editKecamatan(data: AddKabupatenResp) {
    return this.httpClient.post<AddKabupatenResp>(this.apiKabupatenURL+ 'kabupaten/update', data);
  }

  delKecamatan(data: AddKabupatenResp) {
    return this.httpClient.post<AddKabupatenResp>(this.apiKabupatenURL+ 'kabupaten/delete', data);
  }
}
