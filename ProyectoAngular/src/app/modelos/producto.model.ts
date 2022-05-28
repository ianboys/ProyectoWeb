import { Observable } from "rxjs";

export class Producto{
    id?:string;
    idProducto:string = "";
    nombre:string = "";
    cantidad:number = 0;
    precio:number =0;
    imagenUrl:string ="";
    imagenNombre:string = "";

    constructor(idProducto:string, nombre:string, cantidad:number, precio:number, imagenUrl:string, imagenNombre:string){
        this.idProducto=idProducto;
        this.nombre=nombre;
        this.cantidad=cantidad;
        this.precio=precio;
        this.imagenUrl=imagenUrl;
        this.imagenNombre=imagenNombre
    }
}