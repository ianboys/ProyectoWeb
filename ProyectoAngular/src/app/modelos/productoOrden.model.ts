import { NgbPaginationNumber } from "@ng-bootstrap/ng-bootstrap";

export class ProductoOrden{
    id?:string;
    idProducto:string = "";
    cantidad:number = 0;
    nombre:string = "";
    peso:number = 0;
    cantidadCaja:number = 0;
    precioUnitario:number = 0;
    importeTotal:number = 0;
    pesos?:number[];

    constructor(idProducto:string, cantidad:number, nombre:string, peso:number, 
                cantidadCaja:number, precioUnitario:number, importeTotal:number){
        this.idProducto=idProducto;      
        this.cantidad=cantidad;
        this.nombre=nombre;
        this.peso=peso;
        this.cantidadCaja=cantidadCaja;
        this.precioUnitario=precioUnitario;
        this.importeTotal=importeTotal;
    }
}