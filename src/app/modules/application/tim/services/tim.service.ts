import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CryptoService } from 'src/app/modules/service/crypto/crypto.service';
import { Utils } from 'src/app/modules/utils/utils';
import { environment } from 'src/environments/environment';
import { KabupatenList } from '../../masters/kabupaten/models/kabupaten-resp.model';
import { KecamatanList } from '../../masters/kecamatan/models/kecamatan-resp.model';
import { KelurahanList } from '../../masters/kelurahan/models/kelurahan-resp.model';
import { TpsList } from '../../tps/models/tps-resp.model';
import { TimReqData } from '../models/tim-req.model';
import { TimList, TimResp } from '../models/tim-resp.model';

@Injectable({
  providedIn: 'root'
})
export class TimService {
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

  getData(pages: number, limit: number) {
    return this.httpClient
      .get<TimList>(`${this.apiURL}panitia?page=${pages}&limit=${limit}`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  getDataKabupaten(pages: number, limit: number) {
    return this.httpClient
      .get<KabupatenList>(`${this.apiURL}kabupaten?page=${pages}&limit=${limit}`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  getDataKecamatan(pages: number, limit: number) {
    return this.httpClient
      .get<KecamatanList>(`${this.apiURL}kecamatan?page=${pages}&limit=${limit}`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  getDataKelurahan(pages: number, limit: number) {
    return this.httpClient
      .get<KelurahanList>(`${this.apiURL}kelurahan?page=${pages}&limit=${limit}`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  getDataTPS(pages: number, limit: number) {
    return this.httpClient
      .get<TpsList>(`${this.apiURL}tps?page=${pages}&limit=${limit}`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  add(data: TimReqData) {
    return this.httpClient.post<TimResp>(this.apiURL+ 'account/auth/create/user', data, { headers: this.headers });
  }

  edit(id: string, data: any) {
    return this.httpClient.patch(`${this.apiURL}panitia/${id}`, data, { headers: this.headers });
  }

  del(id: string) {
    return this.httpClient.delete(`${this.apiURL}panitia/${id}`, { headers: this.headers });
  }
}
