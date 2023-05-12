import { context, logging, ContractPromiseBatch, u128 } from 'near-sdk-as';
import { Book, allBooks, Contributor, allContributors, ONE_NEAR } from './models'

const contractOwner = context.sender;
const allBooksIndex = allBooks.length;
const allContributorsIndex = allContributors.length;

// Creates a new instance of a book and stores it on a PersistentVector
export function uploadBook(name: string, description: string, image: string, file: string, author: string, language: string, publisher: string): Book {
    const newBookUpload = new Book(name, description, image, file, author, language, publisher);
    allBooks.push(newBookUpload);
    logging.log('Nuevo libro publicado: ' + newBookUpload.name)
    addContributor();
    return newBookUpload;
}

// Returns all books on the PersistentVector
export function getBooks(): Book[] {
    const data = new Array<Book>(allBooksIndex);
    for(let i = 0; i < allBooksIndex; i++) {
        data[i] = allBooks[i]
    }
    return data;
}

// Returns a single book (if exists)
export function getBook(bookIndex: i32): Book {
    if(allBooks.length < bookIndex) {
        logging.log('Book doesnt exist')
    }
    return allBooks[bookIndex]
}

// Used to validate testing for deleteBooks function
export function booksLen(): number {
    return allBooks.length;
}

// Empties the PersistentVector in charge of storing all books
export function deleteBooks(): void {
    while(allBooks.length > 0) {
        allBooks.pop();
    }
}

// Deletes a book (if exists) based on its position on the Book PersistentVector
export function deleteBook(bookIndex: i32): bool {
    if(allBooks.length < bookIndex) {
        logging.log('This book doesnt exist')
        return false
    }
    allBooks.swap_remove(bookIndex);
    logging.log('The book has been deleted!');
    return true
}

// Lets a user change the ownership of a book in case its required
export function changeBookOwner(bookIndex: i32): bool {
    if(allBooks.length < bookIndex) {
         logging.log('This book doesnt exist!')
         return false;
    } else if(allBooks[bookIndex].owner == context.sender) {
            logging.log('This user already owns this book.')
            return false;
        }
    else {
        allBooks[bookIndex].owner = context.sender;
        logging.log('Book ownership swap!')
        return true;
    }
}

// Returns the owner of the contract
export function getOwner(): string {
    return contractOwner;
}

// Returns all the contributors
export function getContributors(): Contributor[] {
    const data = new Array<Contributor>(allContributorsIndex);
    for(let i = 0; i < allContributorsIndex; i++) {
        data[i] = allContributors[i]
    }
    return data;
}

// Used to test deleteContributors function
export function getContributorsLength(): number {
    return allContributors.length;
}

// Adds a new contributor to the allContributors PersistentVector
export function addContributor(): Contributor {
    const data = new Array<Contributor>(allContributorsIndex) 
    let exists = false;
     const contributor = new Contributor()
    for(let i = 0; i < allContributorsIndex; i++) {
        data[i] = allContributors[i];
    }
    for(let x = 0; x < data.length; x++) {
        if(context.sender == data[x].user) {
             logging.log('This user is already a contributor!')
             exists = true;
            break
        }
    }
    if(exists == false) {
        logging.log('User is not a contributor, adding him now!')
        allContributors.push(contributor)
        return contributor
    }
    return contributor
}

// Checks if a contributor exists based on its username, making it easier for the user to check
export function findContributor(contributorUser: String):bool {
    const data = new Array<Contributor>(allContributorsIndex);
    if(allContributorsIndex <= 0) {
        logging.log("Theres no contributors right now")
        return false;
    } else {
        for(let i = 0; i < allContributorsIndex; i++) {
            data[i] = allContributors[i]
            if(data[i].user == contributorUser) {
                logging.log('Contributor ' + contributorUser + ' was found!')
                return true
            }
            break
        }
        logging.log('This contributor doesnt exist.')
        return false;
    }
}

// Empties the allContributors PersistentVector
export function deleteContributors(): void {
    while(allContributors.length > 0) {
        allContributors.pop()
    }
    logging.log(
        'Se ha vaciado la lista de contributors'
    )
}

// Lets the user make a donation to the book owner
export function makeDonation(bookOwnerIndex: i32): bool {
    const data = new  Array<Book>(allBooksIndex);
    if(bookOwnerIndex > allBooksIndex) {
        logging.log('El libro/owner no existe.')
        return false
    } else {
         assert(context.attachedDeposit > ONE_NEAR, 'Monto a donar'); 
        return true

    }
   }

// Lets the user make a donation to the project
export function donateToProject(): void {
    assert(context.attachedDeposit > ONE_NEAR, 'You need to deposit some NEAR.')
    logging.log('Gracias por su contribucion')
}
