class sharingModel {
    constructor(
        public userId: string,
        public name: string,
        public noteId: string,
        public attending: boolean,
        public _id?: string
      ) { }
}

export { sharingModel };
