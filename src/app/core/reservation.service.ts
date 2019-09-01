import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import {Md5} from 'ts-md5/dist/md5';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {



  constructor(private http : HttpClient) { }

  saveReservationDetails(reservation){
    const hash = new Md5().appendStr(JSON.stringify(reservation)+'customSalt').end(false).toString();
    localStorage.setItem('reservationHash', hash);
    localStorage.setItem('reservationDetail', JSON.stringify(reservation));
  }


  getAvailabilities(){
    return this.http.post(`${environment.ApiUrl}/reservations/dates`, {})
      .pipe(map((res:any) => res.result));
  }

  getCurrentReservationDetails(){
    const hash = localStorage.getItem('reservationHash');
    const reservation = localStorage.getItem('reservationDetail');
    if(hash == new Md5().appendStr(reservation + 'customSalt').end(false).toString()){
      return reservation;
    }else{
      localStorage.clear();
      window.location.href = 'https://whabitat.fr';
    }
  }

  confirmReservation(obj){
    return this.http.post(`${environment.ApiUrl}/payments/confirm`, obj)
      .pipe(map((res:any) => res.result));
  }
}
