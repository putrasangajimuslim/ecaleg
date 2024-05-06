import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CryptoService } from 'src/app/modules/service/crypto/crypto.service';
import { Utils } from 'src/app/modules/utils/utils';
import { environment } from 'src/environments/environment';
import { KabupatenList } from '../../kabupaten/models/kabupaten-resp.model';
import { KecamatanReq } from '../models/kecamatan-req.model';
import { KecamatanList, KecamatanResp } from '../models/kecamatan-resp.model';

@Injectable({
  providedIn: 'root'
})
export class KecamatanService {

  apiKecamatanURL = environment.apiUrl;
  token: string = '';
  headers: HttpHeaders;
  
  constructor(
    private httpClient: HttpClient,
    private cryptoService: CryptoService, 
    private utils: Utils,
  ) { 
    const encryptedMapping = this.utils.getLocalStorage('encryptedMapping');

    if (encryptedMapping) {
      const decryptedMapping =
            this.cryptoService.decryptData(encryptedMapping);

      this.token = decryptedMapping.token;
    } else {
      this.token = environment.token;
    }

    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  getKecamatan() {
    return this.httpClient
      .get<KecamatanList>(`${this.apiKecamatanURL}kecamatan`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  getKodeKabupaten() {
    return this.httpClient
      .get<KabupatenList>(`${this.apiKecamatanURL}kabupaten`, { headers: this.headers })
      .pipe(map((res) => res));
  }

  addKecamatan(data: KecamatanReq) {
    return this.httpClient.post<KecamatanResp>(this.apiKecamatanURL+ 'kecamatan/add', data, { headers: this.headers });
  }

  editKecamatan(id: string, data: KecamatanReq) {
    return this.httpClient.patch(`${this.apiKecamatanURL}kecamatan/${id}`, data, { headers: this.headers });
  }

  delKecamatan(id: string) {
    return this.httpClient.delete(`${this.apiKecamatanURL}kecamatan/${id}`, { headers: this.headers });
  }
  
}
