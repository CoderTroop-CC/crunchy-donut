export class SharingModel {
    constructor(
        public userId: string,
        public userName: string,
        public eventId: string,
        public collaborator: boolean,
        public _id?: string
      ) { }
}
