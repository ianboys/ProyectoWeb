import { ProductoOrden } from "./productoOrden.model";

export class Orden{
    id?:string;
    inVoice:string = "";
    cliente:string = "";
    fecha:Date = new Date("");
    productos: ProductoOrden[];
    granTotal: number = 0;

    constructor(inVoice:string, cliente:string, fecha:Date, productos:ProductoOrden[], granTotal:number){
        this.inVoice=inVoice;
        this.cliente=cliente;
        this.fecha=fecha;
        this.productos=productos;
        this.granTotal=granTotal;
    }
}