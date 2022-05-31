import { Component, OnInit } from '@angular/core';
import { Producto } from '../modelos/producto.model';
import { Cliente } from '../modelos/cliente.model';
import { ProductosService } from '../servicios/productos.service';
import { ClienteService } from '../servicios/clientes.service';
import { Orden } from '../modelos/orden.model';

@Component({
  selector: 'app-orden-component',
  templateUrl: './orden-component.component.html',
  styleUrls: ['./orden-component.component.css']
})
export class OrdenComponentComponent implements OnInit {
  productos:Producto[]=[];
  clientes:Cliente[]=[];
  ordenes:Orden[]=[];
  titulo = "Orden Nueva";
  id?: string;

  cuadroCliente:string="";
  cuadroFecha:Date= new Date("");
  idProductosOrden:string[] = []
  productosOrden:Producto[] = [];

  constructor(private productoService:ProductosService, private clienteService:ClienteService) { }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerClientes();
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

  buscarCliente(nombre:string){
    var id = "";
    this.clienteService.buscarCliente(nombre).subscribe((res:any) =>{
      id = res.id;
    })
    return id;
  }

  agregarQuitarProducto(id:string | undefined){
    if(this.idProductosOrden.includes(String(id))==true){
      this.idProductosOrden.splice(this.idProductosOrden.indexOf(String(id)))
      console.log(id+" quitado")
    }else{
      this.idProductosOrden.push(String(id));
      console.log(id+" agregado")
    }
  }

  agregarProductos(){
    this.idProductosOrden.forEach(element => {
      this.productoService.buscarProducto(element).subscribe((doc:any) =>{
        this.productosOrden.push({
          id: doc.id,
          idProducto: doc.data().idProducto,
          nombre: doc.data().nombre,
          cantidad: doc.data().cantidad,
          precio: doc.data().precio,
          imagenUrl: doc.data().imagenUrl,
          peso: doc.data().peso
        })
      })
    });
    console.log(this.productosOrden);
  }

  /*agregarOrden(){
    var id = this.buscarCliente(this.cuadroCliente);
    const nuevaOrden: Orden = {
      idCliente: id,
      fecha: this.cuadroFecha,
      productos: []
    }
  }*/

}
