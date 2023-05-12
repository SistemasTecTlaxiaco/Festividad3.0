import { context, PersistentVector, u128 } from "near-sdk-as";
@nearBindgen
export class Evento {
  id_evento: int;
  Nombre: string;
  Descripcion: string;
  Precio: float;
  Fecha: dateTime;
  Hora: time;
  Proveedor: string;
  Reservacion: int;


  constructor(id_evento: int, Nombre: string,  Descripcion: string, Precio: float, Fecha: dateTime, Hora: time, Proveedor: string, Reservacion: int) {
    this.id_evento = id_evento;
    this.Nombre = Nombre;
    this.Descripcion = Descripcion;
    this.Precio = Precio;
    this.Fecha = Fecha;
    this.Hora = Hora;
    this.Proveedor = context.sender;
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
    Correo: mail;
    RedesS: string;
    Proveedor: boolean;
    Cliente: boolean;
    Sexo: string;
    FechaNac: dateTime;
    Wallet: Object;

    constructor(Nombre: string, ApellidoPat: string, ApellidoMat: string, Telefono: string, Direccion: string, Correo: mail, RedesS: string, Proveedor: boolean, Cliente: boolean, Sexo: string, FechaNac: dateTime, Wallet: Object) {
        this.Nombre = context.sender;
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
        this.Wallet = Wallet;
    }
}

export const allEvento = new PersistentVector<Evento>("v")
export const allUsuarios = new PersistentVector<Usuarios>("c")
export const ONE_NEAR = u128.from('10000000000000000')

