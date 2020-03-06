import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/core/reservation.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(private reservationService : ReservationService) { }
  reservation
   ngOnInit() {
    this.reservationService.getMyLastReservation().subscribe(resa => {
      this.reservation = resa
      console.log(resa);
    });
  }

}
