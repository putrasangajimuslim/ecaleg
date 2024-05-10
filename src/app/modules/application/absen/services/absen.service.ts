import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CryptoService } from 'src/app/modules/service/crypto/crypto.service';
import { Utils } from 'src/app/modules/utils/utils';
import { environment } from 'src/environments/environment';
import { AbsenList, AbsenResp } from '../models/absen-resp.model';

@Injectable({
  providedIn: 'root'
})
export class AbsenService {

  apiURL = environment.apiUrl;
  token: string = '';
  headers: HttpHeaders;
  
  constructor(
    private httpClient: HttpClient, 
    private cryptoService: CryptoService, 
    private utils: Utils,
  ) { 
    // const encryptedMapping = this.utils.getLocalStorage('encryptedMapping');

    // if (encryptedMapping) {
    //   const decryptedMapping =
    //         this.cryptoService.decryptData(encryptedMapping);

    //   this.token = decryptedMapping.token;
    //   this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    // } else {
    //   this.token = environment.token;
    //   this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    // }

    this.token = this.utils.getLocalStorage('token');
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  getAbsen() {
    return this.httpClient
      .get<AbsenList>(`${this.apiURL}absen`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  getUsers() {
    return this.httpClient
      .get<AbsenList>(`${this.apiURL}partai`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  add(data: FormData) {
    return this.httpClient.post<AbsenResp>(this.apiURL+ 'calon/add', data, { headers: this.headers });
  }

  edit(id: string, data: FormData) {
    return this.httpClient.patch(`${this.apiURL}calon/${id}`, data, { headers: this.headers });
  }

  del(id: string) {
    return this.httpClient.delete(`${this.apiURL}calon/${id}`, { headers: this.headers });
  }
}
