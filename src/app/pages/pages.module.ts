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
import { SuccessComponent } from './payments/success/success.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {NbMenuModule, NbDialogModule, NbCheckboxModule, NbToastrModule} from '@nebular/theme';
import { NbThemeModule, NbLayoutModule, NbButtonModule, NbCardModule } from '@nebular/theme';
import { RefundModalComponent } from './dashboard/refund-modal/refund-modal.component';

@NgModule({
  declarations: [LoginComponent, ReservationSummaryComponent, ReservationComponent, SignupComponent, PaymentsComponent, SuccessComponent, DashboardComponent, RefundModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    NbMenuModule.forRoot(),
    NbThemeModule,
    NbLayoutModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbToastrModule.forRoot(),
    NbDialogModule.forRoot()
  ],
  entryComponents: [
    RefundModalComponent,
  ]
})
export class PagesModule { }
