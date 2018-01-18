import { EmailValidator } from "@angular/forms/src/directives/validators";

class CommentModel {
    constructor(
        public userId: string,
        public name: EmailValidator,
        public noteId: string,
        public comment: string,
        public _id?: string
      ) { }
}

class FormCommentModel {
    constructor(
        public userId: string,
        public name: EmailValidator,
        public noteId: string,
        public comment: string,
        public _id?: string
    ) { }
  }

export { CommentModel, FormCommentModel };
