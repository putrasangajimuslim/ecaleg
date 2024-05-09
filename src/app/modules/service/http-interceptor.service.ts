import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CryptoService } from './crypto/crypto.service';
import { Utils } from '../utils/utils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private cryptoService: CryptoService, 
    private utils: Utils,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Ambil token dari localStorage atau dari mana pun Anda menyimpannya

    let token = '';
    const encryptedMapping = this.utils.getLocalStorage('encryptedMapping');

    if (encryptedMapping) {
      const decryptedMapping =
            this.cryptoService.decryptData(encryptedMapping);

      token = decryptedMapping.token;
    } else {
      token = environment.token;
    }

    // Jika ada token, tambahkan ke header Authorization
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
