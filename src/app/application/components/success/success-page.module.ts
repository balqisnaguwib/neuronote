import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessPageComponent } from './success-page.component';
import { SuccessPageRoutingModule } from './success-page-routing.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    SuccessPageComponent
  ],
  imports: [
    CommonModule,
    SuccessPageRoutingModule,
    ButtonModule
  ]
})
export class SuccessPageModule { }