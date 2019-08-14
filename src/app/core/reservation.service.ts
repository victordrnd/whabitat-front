import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {




  constructor(private http : HttpClient) { }

  getCurrentReservationDetails(){
    return localStorage.getItem('reservationDetail');
  }
}
