import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Orden } from '../modelos/orden.model';
import { OrdenComponentComponent } from '../orden-component/orden-component.component';
import { OrdenesService } from '../servicios/ordenes.service';
import { ClienteService } from '../servicios/clientes.service';
import { Cliente } from '../modelos/cliente.model';

@Component({
  selector: 'app-orden-desglose-component',
  templateUrl: './orden-desglose-component.component.html',
  styleUrls: ['./orden-desglose-component.component.css']
})
export class OrdenDesgloseComponentComponent implements OnInit {
  ordenes:Orden[]=[];
  clientes:Cliente[]=[];
  cuadroAcomodo:string = "";

  titulo = "ORDENES";
  id?: string;

  idEliminar:string="";
  acomodo:string="";

  constructor(private ordenService:OrdenesService, 
              private storage: AngularFireStorage, 
              private modalService: NgbModal,
              private clientService: ClienteService) { }

  ngOnInit(): void {
    this.obtenerOrdenes();
    this.obtenerClientes();

  }

  obtenerOrdenes(){
    this.ordenService.obtenerOrdenes(this.acomodo).subscribe(doc => {
      this.ordenes = [];
      doc.forEach((element: any) => {
        this.ordenes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }

  obtenerClientes(){
    this.clientService.obtenerClientes().subscribe(doc => {
      this.clientes = [];
      doc.forEach((element: any) => {
        this.clientes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.clientes);
    })
  }

  obtenerAcomodo(){
    this.acomodo = this.cuadroAcomodo
    this.obtenerOrdenes();
  }

  editarOrden(id: string | undefined){
    console.log(this.ordenes.find(element => element.id == id));
    var ordenTemp:Orden[] = [];
    ordenTemp.push(this.ordenes.find(element => element.id == id)!);
    this.ordenService.sendParam(ordenTemp);
  }

  abrirModalConfirmacion(id:string | undefined, contenido:any){
    this.modalService.open(contenido);
    (<HTMLInputElement>document.getElementById("idOrden")).innerHTML = id!;
    this.idEliminar=id!;
  }

  cerrarModalConfirmacion(contenido:any){
    this.modalService.dismissAll(contenido);
    this.limpiarCampos();
  }

  eliminarOrden(id: any, contenido:any){
    this.ordenService.eliminarOrden(id).then(() => {
      this.cerrarModalConfirmacion(contenido);
      this.limpiarCampos();
      //alert("Producto eliminado exitosamente ");
    }, error => {
      alert("Error al eliminar el producto");
      console.log(error)
    })
  }

  limpiarCampos(){
    this.idEliminar="";
    this.id = undefined;
  }

  createInvoice(id: any,nombre: any){
    this.ordenService.createPDF(this.getOrden(id),this.getPosClientes(nombre));
  }

  getOrden(id: any){
    var ordenTemp:Orden[] = [];
    ordenTemp.push(this.ordenes.find(element => element.id == id)!);
    return ordenTemp;
  }

  getPosClientes(nombre: any){
    var clienteTemp:Cliente[] = [];
    clienteTemp.push(this.clientes.find(element => element.nombre == nombre)!);
    return clienteTemp;
  }

  

  //window.location.reload();
}
