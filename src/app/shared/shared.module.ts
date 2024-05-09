import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TokenInterceptor } from '../modules/service/http-interceptor.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    AutoCompleteModule,
    DropdownModule,
    RippleModule,
    FileUploadModule,
    InputTextareaModule,
    DialogModule,
  ],
  exports: [
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    AutoCompleteModule,
    DropdownModule,
    RippleModule,
    FileUploadModule,
    InputTextareaModule,
    DialogModule,
  ],
  providers: [
    MessageService,
  ]
})
export class SharedModule { }
