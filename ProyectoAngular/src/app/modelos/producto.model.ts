export class Producto{
    id:string = "";
    nombre:string = "";
    cantidad:string = "";
    precio:number =0;

    constructor(id:string, nombre:string, cantidad:string, precio:number){
        this.id=id;
        this.nombre=nombre;
        this.cantidad=cantidad;
        this.precio=precio;
    }
}