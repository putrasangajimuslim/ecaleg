import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Utils } from '../utils/utils';
import { CryptoService } from './crypto/crypto.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private utils: Utils,
    private router: Router,
    private cryptoService: CryptoService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    var isLogin = false;
    var isToken = false;

    const encryptedMapping = this.utils.getLocalStorage('encryptedMapping');

    if (encryptedMapping) {
      const decryptedMapping =
            this.cryptoService.decryptData(encryptedMapping);
        isLogin += decryptedMapping.isLogin;
        isToken += decryptedMapping.token;
    }

    if (isLogin && isToken) {
      return true;
    } else {
      this.router.navigate(['login']).then(() => {
        window.location.reload();
      });
      return false;
    }
  }
}
