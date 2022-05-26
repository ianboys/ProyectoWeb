import { Component, OnInit } from '@angular/core';
import { Producto } from '../modelos/producto.model';
import { ProductosService } from '../servicios/productos.service';

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

  productos:Producto[]=[];

  titulo = "Agregar producto nuevo";
  id: string | undefined;

  constructor(private productoService:ProductosService) { }

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
      this.agregarProducto();
    } else{
      //actualizar producto existente
      this.editarProducto(this.id);
    }
  }

  agregarProducto(){
    const nuevoProducto: Producto = {
      idProducto: this.cuadroId,
      nombre: this.cuadroNombre,
      cantidad: this.cuadroCantidad,
      precio: this.cuadroPrecio
    }

    this.productoService.agregarProducto(nuevoProducto).then(() => {
      console.log("Producto registrado");
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
      precio: this.cuadroPrecio
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
  }

}
