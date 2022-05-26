import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Producto } from '../modelos/producto.model';
import { ProductosService } from '../servicios/productos.service';
import { Observable } from 'rxjs/internal/Observable';

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
  uploadPercent: Observable<number> | undefined;
  cuadroUrl:string="";
  cuadroImagen:string="";

  productos:Producto[]=[];

  titulo = "Agregar producto nuevo";
  id: string | undefined;

  constructor(private productoService:ProductosService, private storage: AngularFireStorage) { }

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
    })
  }

  obtenerProductos(){
    this.productoService.obtenerProductos().subscribe(doc => {
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
      //this.agregarImagenProducto();
      this.agregarProducto();
    } else{
      //actualizar producto existente
      this.editarProducto(this.id);
    }
  }

  agregarImagenProducto(event: Event){
    const id = Math.random().toString(36).substring(2);
    const file = (event.target as HTMLInputElement).files?.item(0);
    const filePath = `uploads/producto_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    //this.uploadPercent = task.percentageChanges()
    task.snapshotChanges().pipe(finalize(() => this.urlImagen = ref.getDownloadURL())).subscribe();

    console.log(id + " # " + file + " # " + filePath);
  }

  agregarProducto(){
    const nuevoProducto: Producto = {
      idProducto: this.cuadroId,
      nombre: this.cuadroNombre,
      cantidad: this.cuadroCantidad,
      precio: this.cuadroPrecio,
      imagen: (<HTMLInputElement>document.getElementById("urlImagen")).value
    }

    this.productoService.agregarProducto(nuevoProducto).then(() => {
      console.log("Producto registrado");
      console.log((<HTMLInputElement>document.getElementById("urlImagen")).value);
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
      imagen: (<HTMLInputElement>document.getElementById("urlImagen")).value
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

  eliminarProducto(id: any){
    this.productoService.eliminarProducto(id).then(() => {
      alert("Producto eliminado exitosamente " + id);
    }, error => {
      alert("Error al eliminar el producto");
      console.log(error)
    })
  }

  agregarEditarProducto(producto : Producto){
    this.productoService.addEditarProducto(producto);
  }

  limpiarCampos(){
    this.cuadroId="";
    this.cuadroNombre="";
    this.cuadroCantidad=0;
    this.cuadroPrecio=0;
    this.cuadroUrl="";
    this.cuadroImagen="";
  }

}
