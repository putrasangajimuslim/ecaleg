import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CryptoService } from 'src/app/modules/service/crypto/crypto.service';
import { Utils } from 'src/app/modules/utils/utils';
import { environment } from 'src/environments/environment';
import { PartaiList, PartaiResp } from '../models/partai-resp.model';

@Injectable({
  providedIn: 'root'
})
export class PartaiService {

  apiPartaiURL = environment.apiUrl;
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

  getPartai(pages: number, limit: number) {
    return this.httpClient
      .get<PartaiList>(`${this.apiPartaiURL}partai?page=${pages}&limit=${limit}`, { headers: this.headers })
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
