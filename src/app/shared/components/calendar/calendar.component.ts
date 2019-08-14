import { ChangeDetectionStrategy, Component, OnInit, Input, Output } from '@angular/core';
import { NbCalendarRangeComponent, NbButtonComponent, NbCardComponent, NbCardHeaderComponent, NbCardBodyComponent, NbSelectComponent } from '@nebular/theme';
import { ParamsService } from 'src/app/core/params.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor(
    private router : Router,
    private paramsService : ParamsService) {
    
  }
  @Input() embbeded = false;
  today = new Date();
  range;
  disabled = true;
  disabledDates = [];
  @Input() vacanciers = 0;
  @Output() close : EventEmitter<string> = new EventEmitter<string>(); 

  filter = (date) => {
    for (let i = 1; i < this.disabledDates.length; i++) { 
      if (date.valueOf() == this.disabledDates[i].valueOf()) {
        return false;
      }
    }
    return true;
  }

  ngOnInit() {
    if(this.vacanciers == 0){
      this.paramsService.isFrameSource.next(true);
    }else{
      this.paramsService.isFrameSource.next(false);
    }
  }


  change() {
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
      this.disabled = false;
      this.disabledDates = [];
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

  submit(){
    let reservation = {
      range : this.range,
      nb : this.vacanciers

    }
    this.paramsService.saveReservationDetails(reservation);
    if(this.embbeded){
      this.close.emit('close');
    }else{
      window.open(`${environment.homeUrl}`, '_blank'); 
    }
  }

}
