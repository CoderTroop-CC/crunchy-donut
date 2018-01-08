import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()
export class UtilsService {

  constructor(private datePipe: DatePipe) { }

  isLoaded(loading: boolean): boolean {
    return loading === false;
  }

  noteDate(created) {
    // Display single-day events as "Jan 7, 2018"
    // Display multi-day events as "Aug 12, 2017 - Aug 13, 2017"
    const createdDate = this.datePipe.transform(created, 'mediumDate');
    //const endDate = this.datePipe.transform(end, 'mediumDate');
  }

  noteDateTime(created) {
    // Display single-day events as "1/7/2018, 5:30 PM - 7:30 PM"
    // Display multi-day events as "8/12/2017, 8:00 PM - 8/13/2017, 10:00 AM"
    const _shortDate = 'M/d/yyyy';
    const createdDate = this.datePipe.transform(created, _shortDate);
    const createdTime = this.datePipe.transform(created, 'shortTime');

  }

}
