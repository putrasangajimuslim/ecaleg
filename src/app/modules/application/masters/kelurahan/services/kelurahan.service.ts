import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CryptoService } from 'src/app/modules/service/crypto/crypto.service';
import { Utils } from 'src/app/modules/utils/utils';
import { environment } from 'src/environments/environment';
import { KecamatanList } from '../../kecamatan/models/kecamatan-resp.model';
import { KelurahanReq } from '../models/kelurahan-req.model';
import { KelurahanList, KelurahanResp } from '../models/kelurahan-resp.model';

@Injectable({
  providedIn: 'root'
})
export class KelurahanService {

  apiKelurahanURL =  environment.apiUrl;
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

  getKelurahan(pages: number, limit: number) {
    return this.httpClient
      .get<KelurahanList>(`${this.apiKelurahanURL}kelurahan?page=${pages}&limit=${limit}`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  getKodeKecamatan(pages: number, limit: number) {
    return this.httpClient
      .get<KecamatanList>(`${this.apiKelurahanURL}kecamatan?page=${pages}&limit=${limit}`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  addKelurahan(data: KelurahanReq) {
    return this.httpClient.post<KelurahanResp>(this.apiKelurahanURL+ 'kelurahan/add', data, { headers: this.headers });
  }

  editKelurahan(id: string, data: KelurahanReq) {
    return this.httpClient.patch(`${this.apiKelurahanURL}kelurahan/${id}`, data, { headers: this.headers });
  }

  delKelurahan(id: string) {
    return this.httpClient.delete(`${this.apiKelurahanURL}kelurahan/${id}`, { headers: this.headers });
  }
}
