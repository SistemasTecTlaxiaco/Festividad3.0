import { context, logging, ContractPromiseBatch, u128 } from 'near-sdk-as';
import { Evento, allEvento, Usuarios, allUsuarios, ONE_NEAR } from './models'

const contractOwner = context.sender;
const allEventoIndex = allEvento.length;
const allUsuariosIndex = allUsuarios.length;

//near call dev-1683922971199-80239892046117 Registrar_Evento '{"id_evento": 1, "Nombre": "Concierto", "Descripcion": "Concierto de rock", "Precio": 100.0, "Fecha": 1654300800000, "Hora": 79200000, "Proveedor": "Proveedor1", "Reservacion": 50}' --accountId federicovs.testnet
export function Registrar_Evento(id_evento: i32, Nombre: string, Descripcion: string, Precio: f64, Fecha: u64, Hora: u64, Proveedor: string, Reservacion: i32): Evento {
    const nuevoEvento = new Evento(id_evento, Nombre, Descripcion, Precio, Fecha, Hora, Proveedor, Reservacion);
    allEvento.push(nuevoEvento);
    logging.log('Nuevo evento registrado: ' + nuevoEvento.Nombre);
    return nuevoEvento;
}

export function Eliminar_Evento(id_evento): Eventos {

}

export function Actualizar_Evento(id_evento, Nombre, Descripcion, Precio, Fecha, Hora, Proveedor, Reservacion): Eventos {

}

export function Buscar_Evento(Nombre, Descripcion, Precio, Fecha): Eventos {

}

export function Autorizacion_Evento(id_evento, nombre): Eventos {

}

export function Cancelar_Evento(id_evento): Eventos {

}

export function Identificar_Evento(nombre, descripcio): Eventos {

}

export function Calendarizacion_Evento(Fecha, Precio, Hora, Reservacion, Proveedor): Eventos {

}

export function Pago_Evento(Precio): Eventos {

}


export function Registrar_Usuario(id_usuario, Nombre, ApellidoPa, ApellidoMat, Telefono, Direccion, Correo, Proveedor, Cliente, Sexo, FechaNac): Usuarios {

}

export function Eliminar_Usuario(id_usuario): Usuarios {

}

export function Actualizar_Usuario(id_usuario, Nombre, ApellidoPa, ApellidoMat, Telefono, Direccion, Correo, Proveedor, Cliente, Sexo, FechaNac): Usuarios {

}

export function Buscar_Usuario(Nombre, ApellidoPa, ApellidoMat): Usuarios {

}

export function Verificar_Usuario(Wallet): Usuarios {

}

export function Identificar_Usuario(Proveedor, Cliente): Usuarios {

}*/