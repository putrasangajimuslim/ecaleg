import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Utils } from 'src/app/core/utils/utils';
import { CryptoService } from 'src/app/modules/service/crypto/crypto.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private utils: Utils,
    private router: Router,
    private cryptoService: CryptoService, 
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const encryptedMapping = this.utils.getLocalStorage('encryptedMapping');

    var isLogin = false;
    var token = '';

    if (encryptedMapping) {
      const decryptedMapping =
            this.cryptoService.decryptData(encryptedMapping);

      token = decryptedMapping.token;
      isLogin = true;
    } else {
      token = environment.token;
      isLogin = false;
    }

    if (isLogin && token) {
      return true;
    } else {
      this.router.navigate(['login']).then(() => {
        window.location.reload();
      });
      return false;
    }
  }
}
