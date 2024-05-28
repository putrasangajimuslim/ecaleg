import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CryptoService } from 'src/app/modules/service/crypto/crypto.service';
import { Utils } from 'src/app/modules/utils/utils';
import { environment } from 'src/environments/environment';
import { KabupatenReq } from '../models/kabupaten-req.model';
import { KabupatenList, KabupatenResp } from '../models/kabupaten-resp.model';

@Injectable({
  providedIn: 'root'
})
export class KabupatenService {
  apiKabupatenURL = environment.apiUrl;
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
    // } else {
    //   this.token = environment.token;
    // }
    this.token = this.utils.getLocalStorage('token');
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  getKabupaten(pages: number, limit: number) {
    return this.httpClient
      .get<KabupatenList>(`${this.apiKabupatenURL}kabupaten?page=${pages}&limit=${limit}`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  addKabupaten(data: KabupatenReq) {
    return this.httpClient.post<KabupatenResp>(this.apiKabupatenURL+ 'kabupaten/add', data, { headers: this.headers });
  }

  editKabupaten(id: string, data: KabupatenReq) {
    return this.httpClient.patch(`${this.apiKabupatenURL}kabupaten/${id}`, data, { headers: this.headers });
  }

  delKabupaten(id: string) {
    return this.httpClient.delete(`${this.apiKabupatenURL}kabupaten/${id}`, { headers: this.headers });
  }
}
