import { Injectable } from '@angular/core';

@Injectable()
export class NoteFormService {

  validationMessages: any;
  // Set up errors object
  formErrors = {
    title: '',
    content: '',
    publicView: ''
  };
  // Min/maxlength validation
  textMin = 3;
  titleMax = 36;
  contMax = 200;
  

  constructor() { this.validationMessages = {
    title: {
      required: `Title is <strong>required</strong>.`,
      minlength: `Title must be ${this.textMin} characters or more.`,
      maxlength: `Title must be ${this.titleMax} characters or less.`
    },
    content: {
      required: `Content is <strong>required</strong>.`,
      minlength: `Content must be ${this.textMin} characters or more.`,
      maxlength: `Content must be ${this.contMax} characters or less.`
    },
    publicView: {
      required: `You must specify whether this note should be public.`
    }
  };
}

}
