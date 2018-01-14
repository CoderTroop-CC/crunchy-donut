class NoteModel {
    constructor(
      public title: string,
      public content: string,
      public createdDate: Date,
      public share: boolean,
      public _id?: string,
    ) { }
  }

class FormNoteModel {
    constructor(
      public title: string,
      public content: string,
      public createdDate: string,
      public share: boolean
    ) { }
  }

  export { NoteModel, FormNoteModel };

