import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {

  constructor() { }
  public isFrameSource = new BehaviorSubject<any>(false);
  public isFrame = this.isFrameSource.asObservable();


  saveReservationDetails(reservation){
    localStorage.setItem('reservationDetail', JSON.stringify(reservation));
  }
}
