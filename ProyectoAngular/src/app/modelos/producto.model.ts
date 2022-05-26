import { Observable } from "rxjs";

export class Producto{
    id?:string;
    idProducto:string = "";
    nombre:string = "";
    cantidad:number = 0;
    precio:number =0;
    imagen:string

    constructor(idProducto:string, nombre:string, cantidad:number, precio:number, imagen:string){
        this.idProducto=idProducto;
        this.nombre=nombre;
        this.cantidad=cantidad;
        this.precio=precio;
        this.imagen=imagen;
    }
}