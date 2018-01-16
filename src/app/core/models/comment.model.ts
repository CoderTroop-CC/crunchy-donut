class CommentModel {
    constructor(
        public userId: string,
        public name: string,
        public noteId: string,
        public comment: string,
        public _id?: string
      ) { }
}

export { CommentModel };
