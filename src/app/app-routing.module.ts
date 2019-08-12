import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './shared/components/calendar/calendar.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { SignupComponent } from './pages/signup/signup.component';


const routes: Routes = [
  {
    path:'',
    children : [
      {
        path: '',
        component : ReservationComponent
      }
    ]
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
