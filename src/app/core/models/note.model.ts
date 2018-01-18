class NoteModel {
    constructor(
      public title: string,
      public content: string,
      public publicView: boolean,
      public _id?: string,
    ) { }
  }

class FormNoteModel {
    constructor(
      public title: string,
      public content: string,
      public publicView: boolean,
      public userName: string
    ) { }
  }

  export { NoteModel, FormNoteModel };

