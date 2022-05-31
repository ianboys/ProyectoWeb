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
  urlImagen:Observable<string> | undefined;
  uploadPercent: Observable<number | undefined> | undefined;
  cuadroUrl:string="";
  cuadroImagen:string="";

  clientes:Cliente[]=[];

  titulo = "Agregar cliente nuevo";
  id?: string;

  idEliminar:string="";
  urlImagenEliminar:string="";

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
      this.cuadroUrl = data.imagenUrl;
      (<HTMLInputElement>document.getElementById("txtUrl")).value = data.imagenUrl;
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

  agregarImagenCliente(event: Event){
    if(this.cuadroUrl!="" && this.cuadroUrl!="https://firebasestorage.googleapis.com/v0/b/proyectoangularfacturacion.appspot.com/o/blank-profile-picture.png?alt=media&token=824d1416-efeb-4208-b218-77cf7dcfb872"){
      this.eliminarImagen(this.cuadroUrl);
    }
    
    (<HTMLInputElement>document.getElementById("btnAgregar")).disabled = true;
    const id = Math.random().toString(36).substring(2);
    const file = (event.target as HTMLInputElement).files?.item(0);
    const fileName = id + "_" + file?.name;
    const filePath = `clientes/${fileName}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    console.log(file?.name);

    this.uploadPercent = task.percentageChanges()
    task.snapshotChanges().pipe(finalize(() => {
      this.urlImagen = ref.getDownloadURL(),
      (<HTMLInputElement>document.getElementById("btnAgregar")).disabled = false;
    })).subscribe();

    console.log(id + " # " + file + " # " + filePath);
  }

  agregarCliente(){
    var url:string="";
    if(this.cuadroNombre=="" || this.cuadroDireccion=="" || this.cuadroCiudad=="" || this.cuadroEstado=="" || this.cuadroCodigo==0){
      alert("Favor de rellenar los campos requeridos");
      return;
    }
    if(this.cuadroUrl==""){
      url="https://firebasestorage.googleapis.com/v0/b/proyectoangularfacturacion.appspot.com/o/blank-profile-picture.png?alt=media&token=824d1416-efeb-4208-b218-77cf7dcfb872";
    }else{
      url=this.cuadroUrl;
    }
    const nuevoCliente: Cliente = {
      nombre: this.cuadroNombre,
      direccion: this.cuadroDireccion,
      ciudad: this.cuadroCiudad,
      estado: this.cuadroEstado,
      codigoPostal: this.cuadroCodigo,
      imagenUrl: url
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
      codigoPostal: this.cuadroCodigo,
      imagenUrl: (<HTMLInputElement>document.getElementById("txtUrl")).value
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

  abrirModalConfirmacion(id:string | undefined, imagenUrl:string, contenido:any){
    this.modalService.open(contenido);
    (<HTMLInputElement>document.getElementById("idCliente")).innerHTML = id!;
    this.idEliminar=id!;
    this.urlImagenEliminar=imagenUrl;
  }

  cerrarModalConfirmacion(contenido:any){
    this.modalService.dismissAll(contenido);
    this.limpiarCampos();
  }

  eliminarImagen(urlImagen: string){
    return this.storage.storage.refFromURL(urlImagen).delete();
  }

  eliminarCliente(id: any, urlImagen:string, contenido:any){
    if(urlImagen!="https://firebasestorage.googleapis.com/v0/b/proyectoangularfacturacion.appspot.com/o/blank-profile-picture.png?alt=media&token=824d1416-efeb-4208-b218-77cf7dcfb872"){
      this.eliminarImagen(urlImagen).then(() => {
        console.log("Imagen borrada");
      }, error => {
        console.log(error)
      })
    }
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
    (<HTMLInputElement>document.getElementById("progreso")).style.width = "0";
    (<HTMLInputElement>document.getElementById("imagen")).value ="";
    (<HTMLInputElement>document.getElementById("txtUrl")).value ="";
    this.urlImagen = undefined;
    (<HTMLInputElement>document.getElementById("btnAgregar")).disabled = false;
    this.urlImagenEliminar="";
    this.cuadroUrl="";
  }
  //window.location.reload();
}

