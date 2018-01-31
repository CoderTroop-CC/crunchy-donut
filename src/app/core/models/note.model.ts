class NoteModel {
    constructor(
      public title: string,
      public content: string,
      public email: string,
      public publicView: boolean,
      public _id?: string
    ) { }
  }

class FormNoteModel {
    constructor(
      public title: string,
      public content: string,
      public email: string,
      public publicView: boolean
      
    ) { }
  }

  export { NoteModel, FormNoteModel };

