import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { Label } from 'src/app/config/label';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Utils } from '../../utils/utils';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
    imports: [
        InputTextModule,
        PasswordModule,
        FormsModule,
        CheckboxModule,
        ButtonModule,
        RouterLink,
        ToastModule,
    ],
})
export class LoginComponent {
    label = Label;

    password!: string;

    username!: string;

    constructor(
        public layoutService: LayoutService, 
        private router: Router, private utils: Utils,
        private serviceToast: MessageService
    ) {
      var isLogin = utils.getLocalStorage('isLogin');

      if(isLogin == 'true'){
          router.navigate(['dashboard'],{});
      }
    }

    login() {
      var username = 'admin';
      var password = 'admin';

      if(this.username === username && this.password === password) {
          this.utils.setLocalStorage('isLogin', 'true');

            this.serviceToast.add({
                key: 'tst',
                severity: 'success',
                summary: 'Selamat',
                detail: 'Berhasil Login',
            });

            setTimeout(() => {
                window.location.reload();
            }, 800);
      } else {
            this.serviceToast.add({
                key: 'tst',
                severity: 'error',
                summary: 'Maaf',
                detail: 'Gagal Login, Username atau Password Salah',
            });
      }
    }
}
