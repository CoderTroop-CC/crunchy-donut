import { EmailValidator } from "@angular/forms/src/directives/validators";

class CommentModel {
    constructor(
        //public userId: string,
        public noteId: string,
        public email: string,
        public content: string,
        public _id?: string
      ) { }
}

class FormCommentModel {
    constructor(
        //public userId: string,
        public noteId: string,
        public email: string,
        public content: string,
        public _id?: string
    ) { }
  }

export { CommentModel, FormCommentModel };
