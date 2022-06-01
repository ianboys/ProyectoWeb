import { ProductoOrden } from "./productoOrden.model";

export class Orden{
    id?:string;
    idCliente:string = "";
    fecha:Date = new Date("0000-12-31");
    //productos: string[]=[];
    productos: ProductoOrden[]

    constructor(idCliente:string, fecha:Date, productos:ProductoOrden[]){
        this.idCliente=idCliente;
        this.fecha=fecha;
        this.productos=productos;
    }
}