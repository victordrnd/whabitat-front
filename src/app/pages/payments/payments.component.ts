import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  constructor(private toastr: ToastrService) { }
  stripe;
  cardElement;
  disabled = true;
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
    this.cardElement = elements.create('card', { style: style });
    this.cardElement.mount('#stripe-card');
    this.cardElement.addEventListener('change', (res) => {
      this.disabled = res.complete ? false : true;
    })
  }


  payOrder() {
    this.stripe.createToken(this.cardElement).then(resp => {
      console.log(resp);
      if (resp.error) {
        console.error(resp.error);
      } else {
      }

    })
  }
}
