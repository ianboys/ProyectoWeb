export class Producto{
    id?:string;
    idProducto:string = "";
    nombre:string = "";
    cantidad:number = 0;
    precio:number =0;

    constructor(idProducto:string, nombre:string, cantidad:number, precio:number){
        this.idProducto=idProducto;
        this.nombre=nombre;
        this.cantidad=cantidad;
        this.precio=precio;
    }
}