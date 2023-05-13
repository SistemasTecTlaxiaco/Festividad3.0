
import { context, PersistentVector, u128 } from "near-sdk-as";

//   i32 == int
//   f64 == float
//   u64 == dateTime

@nearBindgen
export class Evento {
  id_evento: i32;
  Nombre: string;
  Descripcion: string;
  Precio: f64;
  Fecha: u64;
  Hora: u64;
  Proveedor: string;
  Reservacion: i32;

  constructor(id_evento: i32, Nombre: string, Descripcion: string, Precio: f64, Fecha: u64, Hora: u64, Proveedor: string, Reservacion: i32) {
    this.id_evento = id_evento;
    this.Nombre = Nombre;
    this.Descripcion = Descripcion;
    this.Precio = Precio;
    this.Fecha = Fecha;
    this.Hora = Hora;
    this.Proveedor = Proveedor;
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
  FechaNac: u64;
  Wallet: string;

  constructor(Nombre: string, ApellidoPat: string, ApellidoMat: string, Telefono: string, Direccion: string, Correo: string, RedesS: string, Proveedor: boolean, Cliente: boolean, Sexo: string, FechaNac: u64, Wallet: string) {
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
    this.Wallet = Wallet;
  }
}

export const allEvento = new PersistentVector<Evento>("v")
export const allUsuarios = new PersistentVector<Usuarios>("c")
export const ONE_NEAR = u128.from('10000000000000000')
