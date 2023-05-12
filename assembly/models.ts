import { context, PersistentVector, u128 } from "near-sdk-as";
@nearBindgen
export class Book {
  name: string;
  description: string;
  owner: string;
  image: string;
  file: string;
  author: string;
  language: string;
  publisher: string;

  constructor(name: string, description: string,image: string, file: string, author: string, language: string, publisher: string) {
    this.owner = context.sender;
    this.name = name;
    this.description = description;
    this.image = image;
    this.file = file;
    this.author = author;
    this.language = language;
    this.publisher = publisher;
  }
}

@nearBindgen
export class Contributor {
    user: string;
    constructor() {
        this.user = context.sender;
    }
}

export const allBooks = new PersistentVector<Book>("v")
export const allContributors = new PersistentVector<Contributor>("c")
export const ONE_NEAR = u128.from('10000000000000000')

