export class Orden{
    id?:string;
    idCliente:string = "";
    fecha:Date = new Date("0000-12-31");
    //productos: string[]=[];
    productos: Array<Array<string>> = [];

    constructor(idCliente:string, fecha:Date, productos:Array<Array<string>>){
        this.idCliente=idCliente;
        this.fecha=fecha;
        this.productos=productos;
    }
}