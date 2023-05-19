import { context, logging, ContractPromiseBatch, u128 } from 'near-sdk-as';
import { Evento, allEvento, Usuarios, allUsuarios, ONE_NEAR } from './models'

const contractOwner = context.sender;
const allEventoIndex = allEvento.length;
const allUsuariosIndex = allUsuarios.length;

export function Registrar_Evento(id_evento: string, Nombre: string, Descripcion: string, Precio: string, Fecha: string, Hora: string, Proveedor: string, Reservacion: string): Evento {
    const nuevoEvento = new Evento(id_evento, Nombre, Descripcion, Precio, Fecha, Hora, Proveedor, Reservacion);
    allEvento.push(nuevoEvento);
    logging.log('Nuevo evento registrado: ' + nuevoEvento.Nombre);
    return nuevoEvento;
}

export function Buscar_Evento(Nombre: string): Evento[] {
    const eventosEncontrados = new Array<Evento>();
    for (let i = 0; i < allEvento.length; i++) {
        if (allEvento[i].Nombre == Nombre) {
            eventosEncontrados.push(allEvento[i]);
        }
    }
    return eventosEncontrados;
}
/*
export function Eliminar_Evento(id_evento: string): bool {
    if(allEvento.length < convertStringToI32(id_evento)) {
        logging.log('El evento no existe')
        return false
    }
    allEvento.swap_remove(parseInt(id_evento));
    logging.log('Evento eliminado');
    return true
    
    
}
*/
/*


export function Actualizar_Evento(id_evento: i32, Nombre: string, Descripcion: string, Precio: f64, Fecha: u64, Hora: u64, Proveedor: string, Reservacion: i32): Evento {
    for (let i = 0; i < allEvento.length; i++) {
        if (allEvento[i].id_evento == id_evento) {
            allEvento[i].Nombre = Nombre;
            allEvento[i].Descripcion = Descripcion;
            allEvento[i].Precio = Precio;
            allEvento[i].Fecha = Fecha;
            allEvento[i].Hora = Hora;
            allEvento[i].Proveedor = Proveedor;
            allEvento[i].Reservacion = Reservacion;
            logging.log('Evento actualizado');
            return allEvento[i];
        }
    }
    logging.log('Evento no encontrado');
}



export function Autorizacion_Evento(id_evento: i32, nombre: string): void {
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

export function Cancelar_Evento(id_evento: i32): void {
    const evento = allEvento.find(e => e.id_evento == id_evento);
    if (!evento) {
        logging.log('Evento no encontrado');
        return;
    }
    evento.Reservacion = 0;
    logging.log(`El evento ${evento.Nombre} ha sido cancelado`);
}

export function Identificar_Evento(nombre: string, descripcion: string): Evento | null {
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
}

export function Registrar_Usuario(id_usuario: i32, Nombre: string, ApellidoPa: string, ApellidoMat: string, Telefono: string, Direccion: string, Correo: string, Proveedor: boolean, Cliente: boolean, Sexo: string, FechaNac: u64): Usuarios {
    const nuevoUsuario = new Usuarios(id_usuario, Nombre, ApellidoPa, ApellidoMat, Telefono, Direccion, Correo, Proveedor, Cliente, Sexo, FechaNac);
    allUsuarios.push(nuevoUsuario);
    logging.log(`Nuevo usuario registrado: ${nuevoUsuario.Nombre} ${nuevoUsuario.ApellidoPa}`);
    return nuevoUsuario;
}

export function Eliminar_Usuario(id_usuario: i32): void {
    const usuarioIndex = allUsuarios.findIndex(u => u.id_usuario == id_usuario);
    if (usuarioIndex == -1) {
        logging.log('Usuario no encontrado');
        return;
    }
    allUsuarios.splice(usuarioIndex, 1);
    logging.log(`El usuario con id ${id_usuario} ha sido eliminado`);
}

export function Actualizar_Usuario(id_usuario: i32, Nombre: string, ApellidoPa: string, ApellidoMat: string, Telefono: string, Direccion: string, Correo: string, Proveedor: boolean, Cliente: boolean, Sexo: string, FechaNac: string): Usuarios {
    const usuario = allUsuarios.find(u => u.id_usuario == id_usuario);
    if (!usuario) {
        logging.log(`El usuario con ID ${id_usuario} no existe`);
        return null;
    }
    usuario.Nombre = Nombre;
    usuario.ApellidoPa = ApellidoPa;
    usuario.ApellidoMat = ApellidoMat;
    usuario.Telefono = Telefono;
    usuario.Direccion = Direccion;
    usuario.Correo = Correo;
    usuario.Proveedor = Proveedor;
    usuario.Cliente = Cliente;
    usuario.Sexo = Sexo;
    usuario.FechaNac = FechaNac;
    logging.log(`El usuario con ID ${id_usuario} ha sido actualizado`);
    return usuario;
}

export function Buscar_Usuario(Nombre: string, ApellidoPa: string, ApellidoMat: string): Usuarios[] {
    return allUsuarios.filter(u => {
        if (Nombre && !u.Nombre.toLowerCase().includes(Nombre.toLowerCase())) {
            return false;
        }
        if (ApellidoPa && !u.ApellidoPa.toLowerCase().includes(ApellidoPa.toLowerCase())) {
            return false;
        }
        if (ApellidoMat && !u.ApellidoMat.toLowerCase().includes(ApellidoMat.toLowerCase())) {
            return false;
        }
        return true;
    });
}

export function Verificar_Usuario(Wallet: string): Usuarios {
    return allUsuarios.find(u => u.Wallet == Wallet);
}

export function Identificar_Usuario(Proveedor: boolean, Cliente: boolean): Usuarios[] {
    return allUsuarios.filter(u => u.Proveedor == Proveedor && u.Cliente == Cliente);
}*/