import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Producto } from '../modelos/producto.model';
import { ProductosService } from '../servicios/productos.service';
import { Observable } from 'rxjs/internal/Observable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-producto-component',
  templateUrl: './producto-component.component.html',
  styleUrls: ['./producto-component.component.css']
})
export class ProductoComponentComponent implements OnInit {
  cuadroId:string="";
  cuadroNombre:string="";
  cuadroCantidad:number=0;
  cuadroPrecio:number=0;
  urlImagen:Observable<string> | undefined;
  uploadPercent: Observable<number | undefined> | undefined;
  cuadroUrl:string="";
  cuadroImagen:string="";
  cuadroPeso:boolean=false;

  productos:Producto[]=[];

  titulo = "Agregar producto nuevo";
  id?: string;

  idEliminar:string="";
  urlImagenEliminar:string="";

  constructor(private productoService:ProductosService, private storage: AngularFireStorage, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.obtenerProductos();

    this.productoService.getEditarProducto().subscribe(data => {
      console.log(data);
      this.id = data.id
      this.titulo = "Actualizar producto";
      this.cuadroId = data.idProducto;
      this.cuadroNombre = data.nombre;
      this.cuadroCantidad = data.cantidad;
      this.cuadroPrecio = data.precio;
      this.cuadroPeso = data.peso;
      this.cuadroUrl = data.imagenUrl;
      (<HTMLInputElement>document.getElementById("txtUrl")).value = data.imagenUrl;
    })
  }

  obtenerProductos(){
    this.productoService.obtenerProductos("").subscribe(doc => {
      this.productos = [];
      doc.forEach((element: any) => {
        this.productos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.productos);
    })
  }

  guardarProducto(){
    if(this.id === undefined){
      //Crear producto nuevo
      this.agregarProducto();
    } else{
      //actualizar producto existente
      this.editarProducto(this.id);
    }
  }

  agregarImagenProducto(event: Event){
    if(this.cuadroUrl!="" && this.cuadroUrl!="https://firebasestorage.googleapis.com/v0/b/proyectoangularfacturacion.appspot.com/o/Producto%20por%20defecto.png?alt=media&token=73984618-84b8-4f61-9077-c73a14234838"){
      this.eliminarImagen(this.cuadroUrl);
    }
    
    (<HTMLInputElement>document.getElementById("btnAgregar")).disabled = true;
    const id = Math.random().toString(36).substring(2);
    const file = (event.target as HTMLInputElement).files?.item(0);
    const fileName = id + "_" + file?.name;
    const filePath = `productos/${fileName}`;
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

  agregarProducto(){
    var url:string="";
    if(this.cuadroId=="" || this.cuadroNombre=="" || this.cuadroPrecio==0){
      alert("Llenar los campos requeridos");
      return;
    }
    if(this.cuadroUrl==""){
      url="https://firebasestorage.googleapis.com/v0/b/proyectoangularfacturacion.appspot.com/o/Producto%20por%20defecto.png?alt=media&token=73984618-84b8-4f61-9077-c73a14234838";
    }else{
      url=this.cuadroUrl;
    }
    const nuevoProducto: Producto = {
      idProducto: this.cuadroId,
      nombre: this.cuadroNombre,
      cantidad: this.cuadroCantidad,
      precio: this.cuadroPrecio,
      peso: this.cuadroPeso,
      imagenUrl: url
    }
    this.productoService.agregarProducto(nuevoProducto).then(() => {
      console.log("Producto registrado");
      console.log((<HTMLInputElement>document.getElementById("txtUrl")).value);
      this.limpiarCampos();
    }, error => {
      console.log(error);
    })
  }

  editarProducto(id: string){
    const nuevoProducto: Producto = {
      idProducto: this.cuadroId,
      nombre: this.cuadroNombre,
      cantidad: this.cuadroCantidad,
      precio: this.cuadroPrecio,
      peso: this.cuadroPeso,
      imagenUrl: (<HTMLInputElement>document.getElementById("txtUrl")).value
    }
    this.productoService.editarProducto(id, nuevoProducto).then(() =>{
      this.titulo = "Agregar producto nuevo";
      this.limpiarCampos();
      this.id = undefined;
      alert('Producto actualizado exitosamente');
    }, error => {
      console.log(error);
    })
  }

  abrirModalConfirmacion(id:string | undefined, imagenUrl:string, contenido:any){
    this.modalService.open(contenido);
    (<HTMLInputElement>document.getElementById("idProducto")).innerHTML = id!;
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

  eliminarProducto(id: any, urlImagen: string, contenido:any){
    if(urlImagen!="https://firebasestorage.googleapis.com/v0/b/proyectoangularfacturacion.appspot.com/o/Producto%20por%20defecto.png?alt=media&token=73984618-84b8-4f61-9077-c73a14234838"){
      this.eliminarImagen(urlImagen).then(() => {
        console.log("Imagen borrada");
      }, error => {
        console.log(error)
      })
    }
    this.productoService.eliminarProducto(id).then(() => {
      this.cerrarModalConfirmacion(contenido);
      this.limpiarCampos();
      //alert("Producto eliminado exitosamente ");
    }, error => {
      alert("Error al eliminar el producto");
      console.log(error)
    })
  }

  agregarEditarProducto(producto : Producto){
    this.productoService.addEditarProducto(producto);
    (<HTMLInputElement>document.getElementById("btnAgregar")).disabled = false;
  }

  limpiarCampos(){
    this.cuadroId = "";
    this.cuadroNombre = "";
    this.cuadroCantidad = 0;
    this.cuadroPrecio = 0;
    (<HTMLInputElement>document.getElementById("progreso")).style.width = "0";
    (<HTMLInputElement>document.getElementById("imagen")).value ="";
    (<HTMLInputElement>document.getElementById("txtUrl")).value ="";
    this.urlImagen = undefined;
    (<HTMLInputElement>document.getElementById("btnAgregar")).disabled = false;
    this.idEliminar="";
    this.urlImagenEliminar="";
    this.id = undefined;
    this.cuadroUrl="";
  }
  //window.location.reload();
}
