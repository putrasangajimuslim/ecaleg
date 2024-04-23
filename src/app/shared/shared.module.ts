import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';



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
  ],
  providers: [
    MessageService
  ]
})
export class SharedModule { }
