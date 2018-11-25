export class Post {
  constructor(public id: number,
    public title: string,
    public content: string,
    public creationDate: Date,
    public likes: number) {
  }
}
