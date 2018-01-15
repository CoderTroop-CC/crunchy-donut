class sharingModel {
    constructor(
        public userId: string,
        public name: string,
        public noteId: string,
        public share: boolean,
        public _id?: string
      ) { }
}

export { sharingModel };
