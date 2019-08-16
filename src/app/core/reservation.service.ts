import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {




  constructor(private http : HttpClient) { }

  getCurrentReservationDetails(){
    return localStorage.getItem('reservationDetail');
  }

  confirmReservation(reservation){
    return this.http.post(`${environment.ApiUrl}/payments/confirm`, {reservation})
      .pipe(map((res:any) => res.result));
  }
}
