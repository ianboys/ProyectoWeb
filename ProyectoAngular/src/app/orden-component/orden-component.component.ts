import { Component, OnInit } from '@angular/core';
import { Producto } from '../modelos/producto.model';
import { Cliente } from '../modelos/cliente.model';
import { ProductosService } from '../servicios/productos.service';
import { ClienteService } from '../servicios/clientes.service';
import { Orden } from '../modelos/orden.model';
import { ProductoOrden } from '../modelos/productoOrden.model';
import { OrdenesService } from '../servicios/ordenes.service';

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
  cuadroPrueba:string="";
  productosTipoOrden:ProductoOrden[]=[];

  ordenActualizar?:Orden[];
  ordenProductosActualizar:ProductoOrden[]=[]

  constructor(private productoService:ProductosService, private clienteService:ClienteService, private ordenService:OrdenesService) { }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerClientes();
    this.obtenerOrdenes();
    
    setTimeout(() => {
      (<HTMLInputElement>document.getElementById("main-secundario")).hidden = true;
      (<HTMLInputElement>document.getElementById("main")).hidden = false;
      this.obtenerOrdenActualizar();
  }, 2000);

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

  obtenerOrdenActualizar(){
    this.ordenService.sharedParam.subscribe(param => this.ordenActualizar=param);
    if(this.ordenActualizar!.length == 0){
      console.log("if");
      return;
    }
    this.ordenProductosActualizar = this.ordenActualizar![0].productos;
    
  }

  buscarCliente(nombre:string){
    var idCliente:string ;
    const clienteTemp: Cliente =this.clientes.find(element => element.nombre == nombre)!;
    idCliente = clienteTemp.id!;
    console.log(idCliente);
    return idCliente;
  }

  agregarQuitarProducto(id:string | undefined){
    console.log("id agregar producto: "+id);
    if((<HTMLInputElement>document.getElementById(id!)).checked == true){
      if(this.idProductosOrden.findIndex(element => element == id) == -1){
        this.idProductosOrden.push(String(id));
      }
    }else{
      this.idProductosOrden.splice(this.idProductosOrden.indexOf(String(id)))
    }
    console.log(this.idProductosOrden);
  }

  agregarProductos(){
    this.agregarProductosNuevo();
  }

  agregarProductosNuevo(){
    if(this.cuadroCliente=="" || !(this.cuadroFecha.valueOf())){
      alert("Favor de Llenar los campos requeridos");
      return;
    }else if(this.idProductosOrden.length == 0){
      alert("Selecciona al menos un Producto");
      return;
    }
    this.productosOrden=[];
    this.idProductosOrden.forEach(element => {
      console.log(this.idProductosOrden);
      this.productoService.buscarProducto(element).subscribe((doc:any) =>{
        console.log("id: " + doc.id + "idProducto: " + doc.idProducto);
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
    (<HTMLInputElement>document.getElementById("btnHacerOrden")).hidden=false;
  }

  agregarProductosActualizar(){
    
  }

  agregarCantidadProducto(id:string, nombre:string, cantidadCaja:number, precioUnitario:number){
    console.log("cantidad: " + "cantidad_"+id);

    const cantidad = parseInt((<HTMLInputElement>document.getElementById("cantidad_"+id)).value)
    const precio = precioUnitario; 
    const indice = this.productosTipoOrden.findIndex(element => element.idProducto == id);

    if(indice != -1 && this.productosTipoOrden[indice].cantidad == 0){
      this.productosTipoOrden[indice].cantidad = cantidad;

    }else if(indice != -1 && this.productosTipoOrden[indice].cantidad != 0){
      this.productosTipoOrden.splice(indice);

    }else{
      const nuevoProductoTipoOrden:ProductoOrden = {
        idProducto: id,
        cantidad: cantidad,
        nombre: nombre,
        peso: 0,
        cantidadCaja: cantidadCaja,
        precioUnitario: precioUnitario,
        importeTotal: cantidad*precio
      }
      this.productosTipoOrden.push(nuevoProductoTipoOrden);
    }
  }

  agregarPesoProducto(id:string, nombre:string, cantidadCaja:number, precioUnitario:number){
    const peso = parseInt((<HTMLInputElement>document.getElementById("peso_"+id)).value)
    const indice = this.productosTipoOrden.findIndex(element => element.idProducto == id);

    console.log("peso: " + peso);

    if(indice != -1 && this.productosTipoOrden[indice].peso == 0){
      this.productosTipoOrden[indice].peso = peso;

    }else if(indice != -1 && this.productosTipoOrden[indice].peso != 0){
      this.productosTipoOrden.splice(indice);
      
    }else{
      const nuevoProductoTipoOrden:ProductoOrden = {
        idProducto: id,
        cantidad: 0,
        nombre: nombre,
        peso: peso,
        cantidadCaja: cantidadCaja,
        precioUnitario: precioUnitario,
        importeTotal: 0
      }
      this.productosTipoOrden.push(nuevoProductoTipoOrden);
    }
  }

  agregarOrden(){
    //console.log(this.productosTipoOrden);
    //console.log(this.productosOrden.find(element => element.peso == true));
    if(this.idProductosOrden.length != this.productosTipoOrden.length || 
      this.productosTipoOrden.findIndex(element => element.cantidad == 0) != -1){
      alert("Favor de Llenar los campos requeridos");
      return;
    }else if(this.productosOrden.findIndex(element => element.peso == true) != -1){
      const indice = this.productosOrden.findIndex(element => element.peso == true);

      if(this.productosTipoOrden[indice].peso == 0){
        alert("Favor de Llenar los campos requeridos (Peso)");
        return;
      }
    }
    var numeroInVoice:number = this.ordenes.length+1;
    numeroInVoice+=1462;

    var total = 0;
    this.productosTipoOrden.forEach(element => {
      total += element.importeTotal;
    });
    const nuevaOrden: Orden = {
      inVoice: "BC"+(numeroInVoice),
      cliente: this.cuadroCliente,
      fecha: this.cuadroFecha,
      productos: this.productosTipoOrden,
      granTotal: total
    }
    console.log(nuevaOrden);
    
    this.ordenService.agregarOrden(nuevaOrden).then(() => {
      alert("Orden Registrada");
      this.limpiarCampos();
    }, error => {
      console.log(error);
    })
  }

  limpiarCampos(){
    this.cuadroCliente="";
    this.cuadroFecha=new Date("");
    this.productosOrden=[];
    this.productosOrden=[];
    window.location.reload();
  }

}
