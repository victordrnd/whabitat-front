import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-refund-modal',
  templateUrl: './refund-modal.component.html',
  styleUrls: ['./refund-modal.component.scss']
})
export class RefundModalComponent implements OnInit {

  constructor() { }
  input;
  check = "CONFIRMER";
  ngOnInit() {
  }

  @Input() reservationId;


  cancelBook(){
    
  }
}
