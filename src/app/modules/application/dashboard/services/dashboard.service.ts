import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CryptoService } from 'src/app/modules/service/crypto/crypto.service';
import { Utils } from 'src/app/modules/utils/utils';
import { ApiWrapper } from 'src/app/shared/models/api-wrapper.model';
import { environment } from 'src/environments/environment';
import { DashboardResp } from '../models/dashboard-resp.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiURL = environment.apiUrl;
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

  getData() {
    return this.httpClient
      .get<ApiWrapper<DashboardResp>>(`${this.apiURL}dashboard`, { headers: this.headers })
      .pipe(map((res) => res.data));
  }
}
