export class NoteModel {
    constructor(
      public title: string,
      public content: string,
      public createdDate: Date,
      public share: boolean,
      public _id?: string,
    ) { }
  }