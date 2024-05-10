import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { LoginFirstResp } from '../../auth/models/login-first-resp.model';
import { LoginMappingResp } from '../../auth/models/login-mapping.model';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  encryptDataFirst(data: LoginFirstResp): string {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key').toString();
    return encryptedData;
  }

  encryptDataSecond(data: LoginMappingResp): string {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key').toString();
    return encryptedData;
  }

  decryptData(encryptedData: string): any {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, 'secret key');
    const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }
}
