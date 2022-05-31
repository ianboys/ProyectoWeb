export class Producto{
    id?:string;
    idProducto:string = "";
    nombre:string = "";
    cantidad:number = 0;
    precio:number =0;
    imagenUrl:string ="";
    peso:boolean = false; 

    constructor(idProducto:string, nombre:string, cantidad:number, precio:number, imagenUrl:string, peso:boolean){
        this.idProducto=idProducto;
        this.nombre=nombre;
        this.cantidad=cantidad;
        this.precio=precio;
        this.imagenUrl=imagenUrl;
        this.peso=peso;
    }
}