import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaymentService } from 'src/app/core/payment.service';
import { ReservationService } from 'src/app/core/reservation.service';
import { Router } from '@angular/router'
import { NbToastrService } from '@nebular/theme';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  constructor(private toastrService: NbToastrService,
    private paymentService: PaymentService,
    private reservationService: ReservationService,
    private router: Router,
    private spinner: NgxSpinnerService) { }
  stripe;
  intent;
  cardElement;
  disabled = true;
  reservation;
  price;
  read = false;
  checkStatus = "info";


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
      this.intent = intent.intent;
      this.price = intent.amount;
      this.cardElement = elements.create('card', { style: style });
      this.cardElement.mount('#stripe-card');
      this.cardElement.addEventListener('change', (res) => {
        this.disabled = res.complete ? false : true;
      });
    });

  }


  async payOrder() {
    if(!this.read){
      this.toastrService.show('Vous devez accepter les conditions générales de vente afin de continuer', "Informations", {status : "basic"});
      this.checkStatus = "danger"
      return;
    }
    this.spinner.show(); 
    const {paymentIntent, error} = this.stripe.confirmCardSetup(this.intent.client_secret, {
      payment_method : {
        card : this.cardElement
      }
    }).then(async res => {
      let obj = {
        reservation: this.reservation,
        intent: this.intent
      };
      await this.reservationService.confirmReservation(obj).toPromise();
      localStorage.removeItem('reservationDetail');
      this.spinner.hide();
      this.router.navigate(['/payments/success']);
    });
  }

  checkboxChange(){
    this.read = ! this.read;
    this.checkStatus = "info";
  }
}
