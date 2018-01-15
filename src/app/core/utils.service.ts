import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()
export class UtilsService {

  constructor(private datePipe: DatePipe) { }

  isLoaded(loading: boolean): boolean {
    return loading === false;
  }

  noteDate(created) {
    // Display as "Jan 7, 2018"
    const createdDate = this.datePipe.transform(created, 'mediumDate');

  }

  tabIs(currentTab: string, tab: string): boolean {
    // Check if current tab is tab name
    return currentTab === tab;
  }

  displayCount(collaborators: number): string {
    const persons = collaborators === 1 ? ' person' : ' people';
    return collaborators + persons;
  }

  booleanToText(bool: boolean): string {
    // Change a boolean to 'Yes' or 'No' string
    return bool ? 'Yes' : 'No';
  }

}
