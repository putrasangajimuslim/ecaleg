import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiWrapper } from 'src/app/shared/models/api-wrapper.model';
import { PartaiList, PartaiResp } from '../models/partai-resp.model';

@Injectable({
  providedIn: 'root'
})
export class PartaiService {

  apiKecamatanURL = 'http://localhost:4000/api/';
  
  constructor(private httpClient: HttpClient) { }

  getPartai() {
    return this.httpClient
      .get<ApiWrapper<PartaiList>>(`${this.apiKecamatanURL}partai`)
      .pipe(map((res) => res.data));
  }

  addPartai(data: PartaiResp) {
    return this.httpClient.post<PartaiResp>(this.apiKecamatanURL+ 'partai/add', data);
  }

  editPartai(data: PartaiResp) {
    return this.httpClient.post<PartaiResp>(this.apiKecamatanURL+ 'partai/update', data);
  }

  delPartai(data: PartaiResp) {
    return this.httpClient.post<PartaiResp>(this.apiKecamatanURL+ 'partai/delete', data);
  }
}
