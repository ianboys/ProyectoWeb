import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Cliente } from '../modelos/cliente.model';
import { ClienteService } from '../servicios/clientes.service';
import { Observable } from 'rxjs/internal/Observable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cliente-component',
  templateUrl: './cliente-component.component.html',
  styleUrls: ['./cliente-component.component.css']
})
export class ClienteComponentComponent implements OnInit {
  cuadroNombre:string="";
  cuadroDireccion:string="";
  cuadroCiudad:string="";
  cuadroEstado:string="";
  cuadroCodigo:number=0;

  clientes:Cliente[]=[];

  titulo = "Agregar cliente nuevo";
  id?: string;

  idEliminar:string="";

  constructor(private clienteService:ClienteService, private storage: AngularFireStorage, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.obtenerClientes();

    this.clienteService.getEditarCliente().subscribe(data => {
      console.log(data);
      this.id = data.id
      this.titulo = "Actualizar cliente";
      this.cuadroNombre = data.nombre;
      this.cuadroDireccion = data.direccion;
      this.cuadroCiudad = data.ciudad;
      this.cuadroEstado = data.estado;
      this.cuadroCodigo = data.codigoPostal;
    })
  }

  obtenerClientes(){
    this.clienteService.obtenerClientes().subscribe(doc => {
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

  guardarCliente(){
    if(this.id === undefined){
      //Crear producto nuevo
      this.agregarCliente();
    } else{
      //actualizar producto existente
      this.editarCliente(this.id);
    }
  }

  agregarCliente(){
    if(this.cuadroNombre=="" || this.cuadroDireccion=="" || this.cuadroCiudad=="" || this.cuadroEstado=="" || this.cuadroCodigo==0){
      alert("Favor de rellenar los campos requeridos");
      return;
    }
    const nuevoCliente: Cliente = {
      nombre: this.cuadroNombre,
      direccion: this.cuadroDireccion,
      ciudad: this.cuadroCiudad,
      estado: this.cuadroEstado,
      codigoPostal: this.cuadroCodigo,
    }
    this.clienteService.agregarCliente(nuevoCliente).then(() => {
      console.log("Cliente registrado");
      this.limpiarCampos();
    }, error => {
      console.log(error);
    })
  }

  editarCliente(id: string){
    const nuevoCliente: Cliente = {
      nombre: this.cuadroNombre,
      direccion: this.cuadroDireccion,
      ciudad: this.cuadroCiudad,
      estado: this.cuadroEstado,
      codigoPostal: this.cuadroCodigo
    }
    this.clienteService.editarCliente(id, nuevoCliente).then(() =>{
      this.titulo = "Agregar cliente nuevo";
      this.limpiarCampos();
      this.id = undefined;
      alert('Cliente actualizado exitosamente');
    }, error => {
      console.log(error);
    })
  }

  abrirModalConfirmacion(id:string | undefined, contenido:any){
    this.modalService.open(contenido);
    (<HTMLInputElement>document.getElementById("idCliente")).innerHTML = id!;
    this.idEliminar=id!;
  }

  cerrarModalConfirmacion(contenido:any){
    this.modalService.dismissAll(contenido);
    this.limpiarCampos();
  }

  eliminarCliente(id: any, contenido:any){
    this.clienteService.eliminarCliente(id).then(() => {
      this.cerrarModalConfirmacion(contenido);
      this.limpiarCampos();
      //alert("Cliente eliminado exitosamente ");
    }, error => {
      alert("Error al eliminar el cliente");
      console.log(error)
    })
  }

  agregarEditarCliente(cliente : Cliente){
    this.clienteService.addEditarCliente(cliente);
  }

  limpiarCampos(){
    this.cuadroNombre = "";
    this.cuadroDireccion = "";
    this.cuadroCiudad = "";
    this.cuadroEstado = "";
    this.idEliminar="";
    this.cuadroCodigo=0;
    this.id = undefined;
  }
  //window.location.reload();
}

