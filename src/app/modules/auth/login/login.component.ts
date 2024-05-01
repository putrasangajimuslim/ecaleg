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
import { Utils } from '../../utils/utils';
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

    formGroup: FormGroup = this.initFormGroup();

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private utils: Utils,
        private serviceToast: MessageService,
        private authService: AuthService
    ) {
        var isLogin = utils.getLocalStorage('isLogin');

        if (isLogin == 'true') {
            router.navigate(['dashboard'], {});
        }
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
                isLogin: true,
            };
    
            this.authService.login(formnewData).subscribe({
                next: (resp) => {
                    const token =  resp.data.token;
                    if (token) {
                        this.utils.setLocalStorage('isLogin', 'true');
                        this.utils.setLocalStorage('token', token);
    
                        setTimeout(() => {
                            this.loading = false;
                            this.serviceToast.add({
                                key: 'tst',
                                severity: 'success',
                                summary: 'Selamat',
                                detail: 'Berhasil Login',
                            });
                            
                            window.location.reload();
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

                    // setTimeout(() => {
                    //     this.loading = false;
                    //     window.location.reload();
                    // }, 800);
                },
            });
        }
    }
}
