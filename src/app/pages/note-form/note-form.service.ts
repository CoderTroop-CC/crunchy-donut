import { Injectable } from '@angular/core';

@Injectable()
export class NoteFormService {

  validationMessages: any;
  // Set up errors object
  formErrors = {
    title: '',
    content: '',
    share: '',
    dateGroup: {
      createdDate: '',
    }
  };
  // Min/maxlength validation
  textMin = 3;
  titleMax = 36;
  contMax = 200;
  dateMax = 10;
  descMax = 2000;
  // Formats
  dateFormat = 'm/d/yyyy';

  constructor() { this.validationMessages = {
    title: {
      required: `Title is <strong>required</strong>.`,
      minlength: `Title must be ${this.textMin} characters or more.`,
      maxlength: `Title must be ${this.titleMax} characters or less.`
    },
    location: {
      required: `Location is <strong>required</strong>.`,
      minlength: `Location must be ${this.textMin} characters or more.`,
      maxlength: `Location must be ${this.contMax} characters or less.`
    },
    createdDate: {
      required: `Created date is <strong>required</strong>.`,
      maxlength: `Created date cannot be longer than ${this.dateMax} characters.`,
      pattern: `Created date must be in the format <strong>${this.dateFormat}</strong>.`,
      date: `Created date must be a <strong>valid date</strong> =< <strong>today</strong>.`
    },
    share: {
      required: `You must specify whether this note should be shared.`
    }
  };
}

}
