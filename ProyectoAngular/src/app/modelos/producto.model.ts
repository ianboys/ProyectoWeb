export class Producto{
    id:string = "";
    nombre:string = "";
    cantidad:number = 0;
    precio:number =0;

    constructor(id:string, nombre:string, cantidad:number, precio:number){
        this.id=id;
        this.nombre=nombre;
        this.cantidad=cantidad;
        this.precio=precio;
    }
}