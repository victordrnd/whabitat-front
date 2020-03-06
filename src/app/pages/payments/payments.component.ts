import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/core/payment.service';
import { ReservationService } from 'src/app/core/reservation.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  constructor(private toastr: ToastrService,
    private paymentService: PaymentService,
    private reservationService: ReservationService,
    private router: Router) { }
  stripe;
  intent;
  cardElement;
  disabled = true;
  reservation;


  ngOnInit() {
    this.stripe = Stripe(environment.stripePublishableKey);
    const elements = this.stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };
    //Create payment intent
    this.reservation = JSON.parse(this.reservationService.getCurrentReservationDetails());
    this.paymentService.createPaymentIntent(this.reservation).toPromise().then((intent) => {
      this.intent = intent
      this.cardElement = elements.create('card', { style: style });
      this.cardElement.mount('#stripe-card');
      this.cardElement.addEventListener('change', (res) => {
        this.disabled = res.complete ? false : true;
      });
    });

  }


  async payOrder() {
    const { paymentIntent, error } = await this.stripe.handleCardPayment(this.intent.client_secret, this.cardElement, {

    });
    if (!error) {
      let obj = {
        reservation: this.reservation,
        intent: this.intent
      };
      await this.reservationService.confirmReservation(obj).toPromise();
      localStorage.removeItem('reservationDetail');
      this.router.navigate(['/payments/success']);
    }
  }
}
