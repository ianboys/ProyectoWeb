import { Component, OnInit } from '@angular/core';
import { Producto } from '../modelos/producto.model';
import { ProductosService } from '../servicios/productos.service';

@Component({
  selector: 'app-orden-component',
  templateUrl: './orden-component.component.html',
  styleUrls: ['./orden-component.component.css']
})
export class OrdenComponentComponent implements OnInit {
  productos:Producto[]=[];
  titulo = "Orden Nueva";
  id?: string;

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

}
