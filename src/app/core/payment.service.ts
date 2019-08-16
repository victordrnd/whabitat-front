import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http : HttpClient) { }


  createPaymentIntent(currentReservation){
    return this.http.post(`${environment.ApiUrl}/payments/intent`, {reservation : currentReservation})
      .pipe(map((res:any) => res.result));
  }
}
