import { Injectable } from '@angular/core';

@Injectable()
export class CommentsFormService {

  validationMessages: any;
  // Set up errors object
  formErrors = {
    content: '',
    email: ''
  };
  // future validation

  constructor() { this.validationMessages = {
    content: {
      required: "Comment text is <strong>required</strong>.",
    },
    email: {
      require: "Email address for comment is <strong>required</strong>"
    }
  };
  }

}
