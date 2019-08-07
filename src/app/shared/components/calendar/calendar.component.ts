import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NbCalendarRangeComponent, NbButtonComponent, NbCardComponent, NbCardHeaderComponent, NbCardBodyComponent, NbSelectComponent } from '@nebular/theme';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor() { }
  today = new Date();
  range;
  disabled = true;
  disabledDates = [];
  vacanciers = 0;

  filter = (date) => {
    for (let i = 1; i < this.disabledDates.length; i++) { 
      if (date.valueOf() == this.disabledDates[i].valueOf()) {
        return false;
      }
    }
    return true;
  }

  ngOnInit() {
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


}
