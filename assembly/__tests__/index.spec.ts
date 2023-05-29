import { context, logging, storage, ContractPromiseBatch, u128 } from 'near-sdk-as';
import { Registrar_Evento} from "..";
import { Evento, allEvento, Usuarios, allUsuarios/*, Proveedors, allProveedors, Clients, allClients*/, ONE_NEAR } from '../models'


const id_evento = '1';
const Nombre = 'Concierto';
const Descripcion = 'Concierto de Rock Pesado.';
const Precio = '100';
const Fecha = '20/05/2023';
const Hora = '04:20';
const Reservacion = '50';




let newEvento = new Evento(id_evento, Nombre, Descripcion, Precio, Fecha, Hora, Reservacion);

const allEventoIndex = allEvento.length;
const allUsuariosIndex = allUsuarios.length;

const contsData = new Array<Usuarios>(allUsuariosIndex);
for(let x = 0; x < allUsuariosIndex; x++) {
    contsData[x] = allUsuarios[x]
}

const data = new Array<Evento>(allEventoIndex);
for(let i=0; i < allEventoIndex; i++) {
    data[i] = allEvento[i]
}

describe("Registrar_Evento", () => {
    it('should return "Nuevo evento registrado"', () => {
        expect(Registrar_Evento('1','Concierto', 'Concierto de Rock Pesado.','100', '20/05/2023', '04:20', '50')).toStrictEqual(newEvento);
    })
})
/*
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
*/
