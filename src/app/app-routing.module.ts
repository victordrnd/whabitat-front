import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './shared/components/calendar/calendar.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PaymentsComponent } from './pages/payments/payments.component';


const routes: Routes = [
  {
    path:'',
    component : ReservationComponent
  },
  {
    path:'payments',
    component : PaymentsComponent
  },
  {
    path: 'signup',
    component : SignupComponent
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
