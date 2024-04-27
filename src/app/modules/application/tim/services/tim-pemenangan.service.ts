import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TimPemenanganReq } from '../models/tim-pemenangan-req.model';
import { TimPemenanganList } from '../models/tim-pemenangan-resp.model';

@Injectable({
  providedIn: 'root'
})
export class TimPemenanganService {
  apiURL = environment.apiUrl;
  token = environment.token;
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  
  constructor(private httpClient: HttpClient) { }

  getData() {
    return this.httpClient
      .get<TimPemenanganList>(`${this.apiURL}users`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  add(data: TimPemenanganReq) {
    return this.httpClient.post<TimPemenanganReq>(this.apiURL+ 'kabupaten/add', data, { headers: this.headers });
  }

  edit(id: string, data: TimPemenanganReq) {
    return this.httpClient.patch(`${this.apiURL}kabupaten/${id}`, data, { headers: this.headers });
  }

  del(id: string) {
    return this.httpClient.delete(`${this.apiURL}kabupaten/${id}`, { headers: this.headers });
  }
}
