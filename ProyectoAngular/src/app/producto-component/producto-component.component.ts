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

  constructor(private productoService:ProductosService) { }

  ngOnInit(): void {
    this.obtenerProductos();
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

  agregarProducto(){
    const nuevoProducto: Producto = {
      id: this.cuadroId,
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

  limpiarCampos(){
    this.cuadroId="";
    this.cuadroNombre="";
    this.cuadroCantidad=0;
    this.cuadroPrecio=0;
  }

}
