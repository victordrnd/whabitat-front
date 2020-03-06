import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/core/reservation.service';
import { NbDialogService } from '@nebular/theme';
import { RefundModalComponent } from './refund-modal/refund-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  items = [
    {
      title: 'Mes réservations',
      icon: 'calendar-outline',
      link: '/dashboard',
    },
    {
      title: 'Mon profil',
      icon: 'person-outline',
      link: [],
    },
    {
      title: 'Contact',
      icon: 'email-outline',
      link: [],
    },
    {
      title: 'Déconnexion',
      icon: 'log-out-outline',
      link: [],
    },
  ];
  reservations : Array<any> = [];
  maxRefundDate = new Date(Date.now() 
  //+ 7.776e9
  );
  constructor(private reservationService : ReservationService,
    private dialogService: NbDialogService
    ) {
   }

  ngOnInit() {
    this.reservationService.getMyReservations().subscribe(reservations => {
      this.reservations = reservations;
    })
    console.log(this.maxRefundDate);

  }


  openRefundModal(id){
    let dialogRef = this.dialogService.open(RefundModalComponent, {
    });
    dialogRef.componentRef.instance.reservationId = id;
  }

  getJsDate(date){
    return new Date(date.replace(/-/g,"/"));
  }
}
