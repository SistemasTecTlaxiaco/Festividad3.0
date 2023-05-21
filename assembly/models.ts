
import { context, PersistentVector, u128 } from "near-sdk-as";

//   i32 == int
//   f64 == float
//   u64 == dateTime

@nearBindgen
export class Evento {
  id_evento: string;
  Nombre: string;
  Descripcion: string;
  Precio: string;
  Fecha: string;
  Hora: string;
  //Proveedor: string;
  Reservacion: string;

  constructor(id_evento: string, Nombre: string, Descripcion: string, Precio: string, Fecha: string, Hora: string, /*Proveedor: string,*/ Reservacion: string) {
    this.id_evento = id_evento;
    this.Nombre = Nombre;
    this.Descripcion = Descripcion;
    this.Precio = Precio;
    this.Fecha = Fecha;
    this.Hora = Hora;
    //this.Proveedor = Proveedor;
    this.Reservacion = Reservacion;
  }
}

@nearBindgen
export class Usuarios {
  Nombre: string;
  ApellidoPat: string;
  ApellidoMat: string;
  Telefono: string;
  Direccion: string;
  Correo: string;
  RedesS: string;
  Proveedor: boolean;
  Cliente: boolean;
  Sexo: string;
  FechaNac: string;
  Wallet: string;

  constructor(Nombre: string, ApellidoPat: string, ApellidoMat: string, Telefono: string, Direccion: string, Correo: string, RedesS: string, Proveedor: boolean, Cliente: boolean, Sexo: string, FechaNac: string, Wallet: string) {
    this.Nombre = Nombre;
    this.ApellidoPat = ApellidoPat;
    this.ApellidoMat = ApellidoMat;
    this.Telefono = Telefono;
    this.Direccion = Direccion;
    this.Correo = Correo;
    this.RedesS = RedesS;
    this.Proveedor = Proveedor;
    this.Cliente = Cliente;
    this.Sexo = Sexo;
    this.FechaNac = FechaNac;
    this.Wallet = context.sender;
  }
}

/*
@nearBindgen
export class Proveedors {
    Nombre: string;
    constructor() {
        this.Nombre = context.sender;
    }
}

@nearBindgen
export class Clients {
    Nombre: string;
    constructor() {
        this.Nombre = context.sender;
    }
}*/

//export const allEvento = new PersistentVector<Evento>("v")
//export const allUsuarios = new PersistentVector<Usuarios>("c")
export const allEvento = new PersistentVector<Evento>('eventos');
export const allUsuarios = new PersistentVector<Usuarios>('usuarios');
//export const allProveedors = new PersistentVector<Proveedors>("proveedores")
//export const allClients = new PersistentVector<Clients>("clientes")
export const ONE_NEAR = u128.from('10000000000000000')
