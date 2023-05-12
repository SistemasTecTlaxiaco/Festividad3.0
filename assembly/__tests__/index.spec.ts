import {Book, allBooks, allContributors, Contributor} from "../models"
import { getBooks, uploadBook, deleteBooks, booksLen, getContributors, findContributor, deleteContributors, getContributorsLength, deleteBook } from "..";
import { context, Context, logging } from "near-sdk-as";


const name = 'Rust Learning Book'
const description = 'Book written for all those people interested in learning the powerfull and reliable Rust Programming Language.'
const image ='https://ipfs.io/ipfs/bafybeiet7srgvvxkzwrcaayorzmecmirkizmbinwwcn2k7wxpaszvfmzdi'
const file = 'https://ipfs.io/ipfs/bafybeia5khhhukn672acm6sfredqdereor7n7zsoobvrwcqk7rmn6ihffi'
const author = 'Book Author'
const publisher = 'Book Publisher'
const language = 'English'

const contributorUser = 'Bob'


let newBook = new Book(name, description, image, file, author, language, publisher);

const allBooksIndex = allBooks.length;
const allContributorsIndex = allContributors.length;

const contsData = new Array<Contributor>(allContributorsIndex);
for(let x = 0; x < allContributorsIndex; x++) {
    contsData[x] = allContributors[x]
}

const data = new Array<Book>(allBooksIndex);
for(let i=0; i < allBooksIndex; i++) {
    data[i] = allBooks[i]
}

describe("uploadBook", () => {
    it('should return "newBookUpload"', () => {
        expect(uploadBook('Rust Learning Book', 'Book written for all those people interested in learning the powerfull and reliable Rust Programming Language.','https://ipfs.io/ipfs/bafybeiet7srgvvxkzwrcaayorzmecmirkizmbinwwcn2k7wxpaszvfmzdi', 'https://ipfs.io/ipfs/bafybeia5khhhukn672acm6sfredqdereor7n7zsoobvrwcqk7rmn6ihffi', 'Book Author', 'English', 'Book Publisher')).toStrictEqual(newBook);
    })
})

describe("getBooks", () => {
    it('should return all books', () => {
        expect(getBooks()).toStrictEqual(data)
    })
})

describe("getContributors", () => {
    it('should return all contributors', () => {
        expect(getContributors()).toStrictEqual(contsData)
    })
})

describe("findContributor", () => {

    it('should be true', () => {
        expect(findContributor(contributorUser)).toBeFalsy()
    })
})

describe("deleteContributors", () => {
    it("should delete all the contributors", () => {
        deleteContributors()
        expect(getContributorsLength()).toBe(0, "Contributors list should be empty.")
    })
})

describe("deleteBooks", () => {
    it('should delete books', () => {
        deleteBooks()
        expect(booksLen()).toBe(0, 'books should be deleted!')
    })
})

