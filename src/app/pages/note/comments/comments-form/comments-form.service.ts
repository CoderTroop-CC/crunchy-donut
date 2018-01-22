import { Injectable } from '@angular/core';

@Injectable()
export class CommentsFormService {

  validationMessages: any;
  // Set up errors object
  formErrors = {
    content: ''
  };
  // future validation

  constructor() { this.validationMessages = {
    content: {
      required: "Comment text is <strong>required</strong>.",
    }
  };
  }

}
