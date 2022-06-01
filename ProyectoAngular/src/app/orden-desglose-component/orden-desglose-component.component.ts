import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Orden } from '../modelos/orden.model';
import { OrdenesService } from '../servicios/ordenes.service';

@Component({
  selector: 'app-orden-desglose-component',
  templateUrl: './orden-desglose-component.component.html',
  styleUrls: ['./orden-desglose-component.component.css']
})
export class OrdenDesgloseComponentComponent implements OnInit {
  ordenes:Orden[]=[];

  titulo = "ORDENES";
  id?: string;

  idEliminar:string="";

  constructor(private ordenService:OrdenesService, private storage: AngularFireStorage, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.obtenerOrdenes();
  }

  obtenerOrdenes(){
    this.ordenService.obtenerOrdenes().subscribe(doc => {
      this.ordenes = [];
      doc.forEach((element: any) => {
        this.ordenes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.ordenes);
    })
  }

  editarOrden(id: string | undefined){
    const indexTemp = this.ordenes.findIndex(element => element.id == id)
    this.ordenService.sendParam(this.ordenes.slice(indexTemp,indexTemp));
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
  //window.location.reload();
}
