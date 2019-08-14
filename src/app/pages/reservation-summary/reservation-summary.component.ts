import { Component, OnInit, Input } from '@angular/core';
import { ReservationService } from 'src/app/core/reservation.service';

@Component({
  selector: 'app-reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrls: ['./reservation-summary.component.scss']
})
export class ReservationSummaryComponent implements OnInit {

  constructor(private reservationService : ReservationService) { }
  showCalendar=false;
  @Input() payment = false;
  reservation
  ngOnInit() {
    this.getReservationDetails();
  }

  getReservationDetails(){
    this.reservation = JSON.parse(this.reservationService.getCurrentReservationDetails());

  }
}
