import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PartaiList } from '../../masters/partai/models/partai-resp.model';
import { CalonReq } from '../models/calon-req.model';
import { CalonList, CalonResp } from '../models/calon-resp.model';

@Injectable({
  providedIn: 'root'
})
export class CalonService {

  apiURL = environment.apiUrl;
  token = environment.token;
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  
  constructor(private httpClient: HttpClient) { }

  getCalon() {
    return this.httpClient
      .get<CalonList>(`${this.apiURL}calon`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  getKodePartai() {
    return this.httpClient
      .get<PartaiList>(`${this.apiURL}partai`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  addCalon(data: CalonReq) {
    return this.httpClient.post<CalonResp>(this.apiURL+ 'calon/add', data, { headers: this.headers });
  }

  editCalon(id: string, data: CalonReq) {
    return this.httpClient.patch(`${this.apiURL}calon/${id}`, data, { headers: this.headers });
  }

  delCalon(id: string) {
    return this.httpClient.delete(`${this.apiURL}calon/${id}`, { headers: this.headers });
  }
}
