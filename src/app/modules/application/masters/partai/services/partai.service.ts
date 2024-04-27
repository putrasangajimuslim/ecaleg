import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PartaiList, PartaiResp } from '../models/partai-resp.model';

@Injectable({
  providedIn: 'root'
})
export class PartaiService {

  apiPartaiURL = environment.apiUrl;
  token = environment.token;
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  
  constructor(private httpClient: HttpClient) { }

  getPartai() {
    return this.httpClient
      .get<PartaiList>(`${this.apiPartaiURL}partai`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  addPartai(data: FormData) {
    return this.httpClient.post<PartaiResp>(this.apiPartaiURL+ 'partai/add', data, { headers: this.headers });
  }

  editPartai(id: string, data: FormData) {
    return this.httpClient.patch(`${this.apiPartaiURL}partai/${id}`, data, { headers: this.headers });
  }

  delPartai(id: string) {
    return this.httpClient.delete(`${this.apiPartaiURL}partai/${id}`, { headers: this.headers });

  }
}
