import { context, logging, storage, ContractPromiseBatch, u128 } from 'near-sdk-as';
import { Evento, allEvento, Usuarios, allUsuarios/*, Proveedors, allProveedors, Clients, allClients*/, ONE_NEAR } from './models'

const contractOwner = context.sender;
const allEventoIndex = allEvento.length;
const allUsuariosIndex = allUsuarios.length;
/*const allProveedorsIndex = allProveedors.length;
const allClientsIndex = allClients.length;*/

//near call dev-1683999050181-38197896769746 Registrar_Evento '{"id_evento": "1", "Nombre": "Concierto", "Descripcion": "Concierto de rock", "Precio": "10.0", "Fecha": "11/07/2023", "Hora": "20:00", "Proveedor": "Proveedor1", "Reservacion": "50"}' --accountId federicovs.testnet
export function Registrar_Evento(id_evento: string, Nombre: string, Descripcion: string, Precio: string, Fecha: string, Hora: string, Reservacion: string): Evento {
    const nuevoEvento = new Evento(id_evento, Nombre, Descripcion, Precio, Fecha, Hora, Reservacion);
    allEvento.push(nuevoEvento);
    logging.log('Nuevo evento registrado: ' + nuevoEvento.Nombre);
    /*if (Proveedor == "True"){
        addProveedors();
    }*/

    return nuevoEvento;
}

//near call dev-1683999050181-38197896769746 Eliminar_Evento '{"Nombre": "Fiesta"}' --accountId federicovs.testnet
export function Eliminar_Evento(id_evento: string): boolean {
    for (let i = 0; i < allEvento.length; i++) {
        if (allEvento[i].id_evento == id_evento) {
            allEvento.swap_remove(i);
            logging.log('Evento eliminado');
            return true;
        }
    }
    logging.log('El evento no existe');
    return false;
}

//near call dev-1683999050181-38197896769746 Actualizar_Evento '{"id_evento": "3", "Nombre": "Concierto", "Descripcion": "Concierto de Rock Pesado", "Precio": "100", "Fecha": "20/05/2023", "Hora": "04:20", "Proveedor": "Heidi", "Reservacion": "50"}' --accountId federicovs.testnet
export function Actualizar_Evento(id_evento: string, Nombre: string, Descripcion: string, Precio: string, Fecha: string, Hora: string, Reservacion: string): Evento | null {
    for (let i = 0; i < allEvento.length; i++) {
        if (allEvento[i].id_evento == id_evento) {
            allEvento.swap_remove(i);
            const nuevoEvento = new Evento(id_evento, Nombre, Descripcion, Precio, Fecha, Hora, Reservacion);
            allEvento.push(nuevoEvento);
            logging.log('Evento actualizado: ' + allEvento[i].Nombre);
            return allEvento[i];
        }
    }
    logging.log('Evento no encontrado');
    return null;
}

//near call dev-1684359389069-58099080863311 Buscar_Evento '{"Nombre": "Concierto"}' --accountId joseantonio1.testnet
export function Buscar_Evento(Nombre: string): Evento[] {
    const eventosEncontrados = new Array<Evento>();
    for (let i = 0; i < allEvento.length; i++) {
        if (allEvento[i].Nombre == Nombre) {
            eventosEncontrados.push(allEvento[i]);
        }
    }
    return eventosEncontrados;
}

/*export function Autorizacion_Evento(id_evento: i32, nombre: string): void {
    for (let i = 0; i < allEvento.length; i++) {
        if (allEvento[i].id_evento == id_evento && allEvento[i].Nombre == nombre) {
            const batch = ContractPromiseBatch.create(allEvento[i].Proveedor);
            batch.addPromise(context.attachedDeposit >= allEvento[i].Precio,
                'El monto enviado debe ser mayor o igual al precio del evento');
            batch.addPromise(context.sender == allEvento[i].Proveedor,
                'Solo el proveedor del evento puede autorizar reservaciones');
            const promesa = batch.then(context.contractName).function_call('Reservar_Evento', { "id_evento": id_evento, "nombre": nombre }, 0, u128.Zero);
            promesa.returnAsResult();
            break;
        }
    }
}
*/

//near call dev-1684702987833-96600875699732 Cancelar_Evento '{"id_evento":"1"}' --accountId sandra1009testnet.testnet
export function Cancelar_Evento(id_evento: string): boolean {
    for (let i = 0; i < allEvento.length; i++) {
        if (allEvento[i].id_evento == id_evento) {
            allEvento.swap_remove(i)
            // Realizar la lógica de cancelación del evento aquí
            // ...

            logging.log('Evento cancelado');
            return true;
        }
    }
    logging.log('El evento no existe');
    return false;
}

//near call dev-1684702987833-96600875699732 Identificar_Evento '{"Nombre":"Fiesta de XV"}' --accountId sandra1009testnet.testnet
export function Identificar_Evento(Nombre: string): boolean {
    for (let i = 0; i < allEvento.length; i++) {
        if (allEvento[i].Nombre === Nombre) {
            logging.log('Evento identificado');
            return true;
        }
    }
    logging.log('El evento no existe');
    return false;
}


/*export function Identificar_Evento(nombre: string, descripcion: string): Evento | null {
  const evento = allEvento.find(e => e.Nombre == nombre && e.Descripcion == descripcion);
  if (!evento) {
      logging.log('Evento no encontrado');
      return null;
  }
  logging.log(`El evento ${evento.Nombre} ha sido identificado`);
  return evento;
}

export function Calendarizacion_Evento(Fecha: u64, Precio: f64, Hora: u64, Reservacion: i32, Proveedor: string): Evento[] {
  const eventos = allEvento.filter(e => e.Fecha == Fecha && e.Precio == Precio && e.Hora == Hora && e.Reservacion == Reservacion && e.Proveedor == Proveedor);
  if (eventos.length == 0) {
      logging.log('No hay eventos en esa fecha, hora y precio');
      return eventos;
  }
  logging.log(`Se han encontrado ${eventos.length} eventos para la fecha ${Fecha}, hora ${Hora}, precio ${Precio}, reserva ${Reservacion} y proveedor ${Proveedor}`);
  return eventos;
}

export function Pago_Evento(Precio: f64): void {
  const accountBalance = context.accountBalance;
  if (accountBalance < Precio) {
      logging.log(`El usuario ${context.sender} no tiene suficientes fondos para pagar el evento`);
      return;
  }
  logging.log(`El usuario ${context.sender} ha pagado ${Precio} NEAR por el evento`);
}*/

//near call dev-1683999050181-38197896769746 Registrar_Usuario '{"Nombre": "Federico Sosa", "ApellidoPat": "Sanchez", "ApellidoMat": "Cruz", "Telefono": "7411265386", "Direccion": "Desconocida", "Correo": "correo@gmail.com", "RedesS": "Facebook, Twitter, Instagram", "Proveedor": true, "Cliente": false, "Sexo": "Masculino", "FechaNac": "29/07/2001", "Wallet": "Sanchez.testnet"}' --accountId federicovs.testnet
export function Registrar_Usuario(Nombre: string, ApellidoPat: string, ApellidoMat: string, Telefono: string, Direccion: string, Correo: string, RedesS: string, Proveedor: boolean, Cliente: boolean, Sexo: string, FechaNac: string, Wallet: string): Usuarios {
    const nuevoUsuario = new Usuarios(Nombre, ApellidoPat, ApellidoMat, Telefono, Direccion, Correo, RedesS, Proveedor, Cliente, Sexo, FechaNac, Wallet);
    allUsuarios.push(nuevoUsuario);
    logging.log('Nuevo usuario registrado: ' + nuevoUsuario.Nombre + ' ' + nuevoUsuario.ApellidoPat);
    /*if (Proveedor == true){
        addProveedors();
    }
    if (Cliente == true){
        addClients();
    }*/

    return nuevoUsuario;
}

//near call dev-1683999050181-38197896769746 Eliminar_Usuario '{"Nombre": "Pedro Picapiedra"}' --accountId federicovs.testnet
export function Eliminar_Usuario(Nombre: string): boolean {
    for (let i = 0; i < allUsuarios.length; i++) {
        if (allUsuarios[i].Nombre == Nombre) {
            allUsuarios.swap_remove(i);
            logging.log('Usuario eliminado');
            return true;
        }
    }
    logging.log('El Usuario no existe');
    return false;
}

//near call dev-1683999050181-38197896769746 Actualizar_Usuario '{"Nombre": "Federico Sosa", "ApellidoPat": "Victoriano", "ApellidoMat": "Sierra", "Telefono": "7411265386", "Direccion": "Desconocida", "Correo": "correo@gmail.com", "RedesS": "Facebook, Twitter, Instagram", "Proveedor": true, "Cliente": false, "Sexo": "Masculino", "FechaNac": "29/07/2001", "Wallet": "Sanchez.testnet"}' --accountId federicovs.testnet
export function Actualizar_Usuario(Nombre: string, ApellidoPat: string, ApellidoMat: string, Telefono: string, Direccion: string, Correo: string, RedesS: string, Proveedor: boolean, Cliente: boolean, Sexo: string, FechaNac: string, Wallet: string): Usuarios | null {
    for (let i = 0; i < allUsuarios.length; i++) {
        if (allUsuarios[i].Nombre == Nombre) {
            allUsuarios.swap_remove(i);
            const nuevoUsuario = new Usuarios(Nombre, ApellidoPat, ApellidoMat, Telefono, Direccion, Correo, RedesS, Proveedor, Cliente, Sexo, FechaNac, Wallet);
            allUsuarios.push(nuevoUsuario);
            logging.log('Usuario actualizado: ' + allUsuarios[i].Nombre);
            return allUsuarios[i];
        }
    }
    logging.log('Usuario no encontrado');
    return null;
}

//near call dev-1683999050181-38197896769746 Buscar_Usuario '{"Nombre": "Pedro Picapiedra"}' --accountId federicovs.testnet
export function Buscar_Usuario(Nombre: string): Usuarios[] {
    const usuariosEncontrados = new Array<Usuarios>();
    for (let i = 0; i < allUsuarios.length; i++) {
        if (allUsuarios[i].Nombre == Nombre) {
            usuariosEncontrados.push(allUsuarios[i]);
        }
    }
    return usuariosEncontrados;
}

/*export function Verificar_Usuario(Wallet: string): Usuarios {
    return allUsuarios.find(u => u.Wallet == Wallet);
}*/

//near call dev-1684702987833-96600875699732 Identificar_Usuario '{"Nombre":"Sandra Velasco"}' --accountId sandra1009testnet.testnet
export function Identificar_Usuario(Nombre: string): boolean {
    for (let i = 0; i < allUsuarios.length; i++) {
        if (allUsuarios[i].Nombre === Nombre) {
            logging.log('Usuario identificado');
            return true;
        }
    }
    logging.log('El Usuario no existe');
    return false;
}



/*
  export function addProveedors(): Proveedors {
    const data = new Array<Proveedors>(allProveedorsIndex) 
    let exists = false;
     const Proveedor = new Proveedors()
    for(let i = 0; i < allProveedorsIndex; i++) {
        data[i] = allProveedors[i];
    }
    for(let x = 0; x < data.length; x++) {
        if(context.sender == data[x].Nombre) {
             logging.log('Este Usuario Proveedor ya existe!')
             exists = true;
            break
        }
    }
    if(exists == false) {
        logging.log('Este Usuario Proveedor no existe, añadiendo ahora!')
        allProveedors.push(Proveedor)
        return Proveedor
    }
    return Proveedor
}


export function addClients(): Clients {
    const data = new Array<Clients>(allClientsIndex) 
    let exists = false;
     const Cliente = new Clients()
    for(let i = 0; i < allClientsIndex; i++) {
        data[i] = allClients[i];
    }
    for(let x = 0; x < data.length; x++) {
        if(context.sender == data[x].Nombre) {
             logging.log('Este Usuario Proveedor ya existe!')
             exists = true;
            break
        }
    }
    if(exists == false) {
        logging.log('Este Usuario Proveedor no existe, añadiendo ahora!')
        allClients.push(Cliente)
        return Cliente
    }
    return Cliente
}

export function getProveedors(): Proveedors[] {
    const data = new Array<Proveedors>(allProveedorsIndex);
    for(let i = 0; i < allProveedorsIndex; i++) {
        data[i] = allProveedors[i]
    }
    return data;
}


export function getProveedorsLength(): number {
    return allProveedors.length;
}
*/
