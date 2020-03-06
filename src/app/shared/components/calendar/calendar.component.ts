import { ChangeDetectionStrategy, Component, OnInit, Input, Output } from '@angular/core';
import { NbCalendarRangeComponent, NbButtonComponent, NbCardComponent, NbCardHeaderComponent, NbCardBodyComponent, NbSelectComponent } from '@nebular/theme';
import { ParamsService } from 'src/app/core/params.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { ReservationService } from 'src/app/core/reservation.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor(
    private router : Router,
    private paramsService : ParamsService,
    private reservationService : ReservationService,
    private spinner: NgxSpinnerService) {

  }
  @Input() embbeded = false;
  today = new Date();
  max = new Date();
  range;
  disabled = true;
  disabledResa =[];
  disabledDates = [];
  loading = true;
  error;
  
  @Input() vacanciers = 0;
  @Output() close : EventEmitter<string> = new EventEmitter<string>(); 

  filter = (date) => {
    return this.isAvailableDate(date);
  }

  ngOnInit() {
    this.spinner.show();
    if(this.vacanciers == 0){
      this.paramsService.isFrameSource.next(true);
    }else{
      this.paramsService.isFrameSource.next(false);
    }
    this.max.setMonth(this.today.getMonth() +12)
    console.log(this.max)
   this.getAvailabilities();

  }


  change() {
    this.error = "";
    if (this.range.start instanceof Date && this.range.end == undefined) {
      let minDate = new Date(this.range.start.valueOf());
      minDate.setDate(minDate.getDate() + 2);
      this.disabledDates = this.getDates(this.range.start, minDate);
    }
    const datesBetween = this.getDates(this.range.start, this.range.end);
    if (datesBetween.length < 4) {
      delete this.range.end;
    }
    if (this.range.start instanceof Date && (this.range.end instanceof Date && this.range.end != undefined)) {
      this.disabledDates = [];
      this.disabled = false;
      datesBetween.forEach(date => {
        for(let i =0; i<this.disabledResa.length; i++){
          if(date.valueOf() == this.disabledResa[i].valueOf()){
            delete this.range.start;
            delete this.range.end;
            this.error = "Les dates choisies sont incorrects, elles comportent des dates déja réservées.";
            this.disabled = true;
          }
        }
      })

    } else {
      this.disabled = true;
    }
  }


  getDates(startDate, endDate) {
    let dates = [],
      currentDate = startDate,
      addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  };


  isAvailableDate(date){
    for (let i = 1; i < this.disabledDates.length; i++) {
      if (date.getDate() == this.disabledDates[i].getDate()) {
        return false;
      }
    }
    for(let i= 0; i< this.disabledResa.length; i++){
      if(date.valueOf() == this.disabledResa[i].valueOf()){
        return false;
      }
    }
    return true;
  }



  getAvailabilities(){
    this.reservationService.getAvailabilities().subscribe((availabilities) => {
      //this.availabilities = availabilities;
      this.disabledResa = [];
      availabilities.forEach(date => {
        let dt = new Date(date);
        dt.setHours(0);
        this.disabledResa.push(dt);
      });
      this.loading = false;
    })
  }



  submit(){
    let reservation = {
      range : this.range,
      nb : this.vacanciers

    }
    this.reservationService.saveReservationDetails(reservation);
    if(this.embbeded){
      this.close.emit('close');
    }else{
      window.open(`${environment.homeUrl}`, '_blank'); 
    }
  }

}
