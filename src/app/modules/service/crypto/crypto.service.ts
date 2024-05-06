import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { LoginMappingResp } from '../../auth/models/login-mapping.model';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  encryptData(data: LoginMappingResp): string {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key').toString();
    return encryptedData;
  }

  decryptData(encryptedData: string): any {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, 'secret key');
    const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }
}
