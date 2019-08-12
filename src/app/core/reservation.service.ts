import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http : HttpClient) { }

  
}
