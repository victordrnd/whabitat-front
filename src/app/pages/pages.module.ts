import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReservationSummaryComponent } from './reservation-summary/reservation-summary.component';
import { ReservationComponent } from './reservation/reservation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PaymentsComponent } from './payments/payments.component';
@NgModule({
  declarations: [LoginComponent, ReservationSummaryComponent, ReservationComponent, SignupComponent, PaymentsComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class PagesModule { }
