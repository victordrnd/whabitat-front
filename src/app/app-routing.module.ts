import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './shared/components/calendar/calendar.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { SuccessComponent } from './pages/payments/success/success.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {AuthGardService} from './core/guards/auth-gard.service';

const routes: Routes = [
  {
    path:'',
    component : ReservationComponent
  },
  {
    path:'payments',
    canActivate: [AuthGardService],
    component : PaymentsComponent
  },
  {
    path: 'payments/success',
    canActivate: [AuthGardService],
    component : SuccessComponent
  },
  {
    path: 'signup',
    component : SignupComponent
  },
  {
    path:'dashboard',
    canActivate: [AuthGardService],
    children:[
      {
        path: '',
        component: DashboardComponent
      }
    ]
  },
  {
    path: 'includes/calendar',
    component: CalendarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
