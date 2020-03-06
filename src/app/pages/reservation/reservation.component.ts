import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/core/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  constructor(private reservationService : ReservationService) { }

  reservation
  ngOnInit() {
    this.getReservationDetails();
  }

  getReservationDetails(){
    const resa = this.reservationService.getCurrentReservationDetails();
    if(resa){
      this.reservation = JSON.parse(resa);
    }
    // if(!this.reservation){
    //   window.location.href ='https://whabitat.fr';
    // }
  }
}
