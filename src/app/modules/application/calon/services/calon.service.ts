import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CryptoService } from 'src/app/modules/service/crypto/crypto.service';
import { Utils } from 'src/app/modules/utils/utils';
import { environment } from 'src/environments/environment';
import { KabupatenList } from '../../masters/kabupaten/models/kabupaten-resp.model';
import { PartaiList } from '../../masters/partai/models/partai-resp.model';
import { CalonList, CalonResp } from '../models/calon-resp.model';

@Injectable({
  providedIn: 'root'
})
export class CalonService {

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
    // } else {
    //   this.token = environment.token;
    // }
    this.token = this.utils.getLocalStorage('token');
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  getCalon() {
    return this.httpClient
      .get<CalonList>(`${this.apiURL}calon`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  getPartai() {
    return this.httpClient
      .get<PartaiList>(`${this.apiURL}partai`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  getKabupaten() {
    return this.httpClient
      .get<KabupatenList>(`${this.apiURL}kabupaten`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  addCalon(data: FormData) {
    return this.httpClient.post<CalonResp>(this.apiURL+ 'calon/add', data, { headers: this.headers });
  }

  editCalon(id: string, data: FormData) {
    return this.httpClient.patch(`${this.apiURL}calon/${id}`, data, { headers: this.headers });
  }

  delCalon(id: string) {
    return this.httpClient.delete(`${this.apiURL}calon/${id}`, { headers: this.headers });
  }
}
