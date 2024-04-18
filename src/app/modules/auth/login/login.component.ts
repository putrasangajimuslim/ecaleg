import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { Label } from 'src/app/config/label';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styles: [`
      :host ::ng-deep .pi-eye,
      :host ::ng-deep .pi-eye-slash {
          transform:scale(1.6);
          margin-right: 1rem;
          color: var(--primary-color) !important;
      }
  `],
  imports: [InputTextModule, PasswordModule, FormsModule, CheckboxModule, ButtonModule, RouterLink, ToastModule]
})
export class LoginComponent {
  label = Label;
  
  password!: string;
    
  username!: string;

  constructor(private router: Router) { 
}

  login() {
    this.router.navigate([''],{});
  }
}
