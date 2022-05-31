export class Cliente{
    id?:string;
    nombre:string = "";
    direccion:string = "";
    ciudad:string = "";
    estado:string ="";
    codigoPostal:number =0;
    imagenUrl:string ="";

    constructor(nombre:string, direccion:string, ciudad:string, estado:string, codigoPostal:number, imagenUrl:string){
        this.nombre=nombre;
        this.direccion=direccion;
        this.ciudad=ciudad;
        this.estado=estado;
        this.codigoPostal=codigoPostal;
        this.imagenUrl=imagenUrl;
    }
}