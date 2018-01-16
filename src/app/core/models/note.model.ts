class NoteModel {
    constructor(
      public title: string,
      public content: string,
      public publicView: boolean,
      public userName: string,
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

