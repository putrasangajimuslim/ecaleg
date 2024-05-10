import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { Label } from 'src/app/config/label';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CryptoService } from '../../service/crypto/crypto.service';
import { Utils } from '../../utils/utils';
import { LoginMappingResp } from '../models/login-mapping.model';
import { LoginRequest } from '../models/login-req.model';
import { AuthService } from '../services/auth.service';

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
        CommonModule,
        InputTextModule,
        PasswordModule,
        FormsModule,
        CheckboxModule,
        ButtonModule,
        RouterLink,
        ToastModule,
        ReactiveFormsModule,
    ],
})
export class LoginComponent {
    label = Label;

    loading: boolean = false;

    encryptedMapping?: LoginMappingResp;

    formGroup: FormGroup = this.initFormGroup();

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private utils: Utils,
        private serviceToast: MessageService,
        private authService: AuthService,
        private cryptoService: CryptoService
    ) {  
    }

    initFormGroup(): FormGroup {
        return new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
        });
    }

    login() {
        this.loading = true;

        if (this.formGroup.valid) {
            const formData = this.formGroup.value;
            const formnewData: LoginRequest = {
                email: formData.username,
                password: formData.password,
            };
    
            this.authService.loginSecond(formnewData).subscribe({
                next: (resp) => {
                    const isActive = resp.akun.isActive;

                    // this.encryptedMapping = {
                    //     id: resp.akun.id,
                    //     isActive: resp.akun.isActive,
                    //     role: resp.akun.profile.role,
                    //     nama_panitia: resp.akun.profile.nama_panitia,
                    //     nik: resp.akun.profile.nik,
                    //     token: resp.token,
                    //     isLogin: true,
                    // };

                    // const encryptedData = this.cryptoService.encryptDataSecond(this.encryptedMapping);
                    
                    if (!isActive) {
                        this.serviceToast.add({
                            key: 'tst',
                            severity: 'error',
                            summary: 'Maaf',
                            detail: 'Gagal Login, Akun Ada Perlu Verikasi',
                        });
                    }
                                
                    const token =  resp.token;
                    if (token) {
                        this.utils.setLocalStorage('token', token);
                        this.utils.setLocalStorage('idLogin', resp.akun.id);
                        this.utils.setLocalStorage('role', resp.akun.profile.role);
    
                        this.serviceToast.add({
                            key: 'tst',
                            severity: 'success',
                            summary: 'Selamat',
                            detail: 'Berhasil Login',
                        });

                        setTimeout(() => {
                            this.loading = false;
                            this.router.navigate(['dashboard'], {});
                        }, 800);
                    }
                },
                error: (err) => {
                    this.serviceToast.add({
                        key: 'tst',
                        severity: 'error',
                        summary: 'Maaf',
                        detail: 'Gagal Login, Username atau Password Salah',
                    });

                    setTimeout(() => {
                        this.loading = false;
                        this.router.navigate(['login'], {});
                    }, 800);
                },
            });
        }
    }
}
