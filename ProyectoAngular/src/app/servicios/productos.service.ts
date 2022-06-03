import { Injectable } from "@angular/core";
import { Producto } from "../modelos/producto.model";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductosService{
    private producto$ = new Subject<any>();

    /*productos:Producto[]=[
        new Producto("C001","Carne",5,500),
        new Producto("Q001","Queso",0,700),
        new Producto("C002","Carne",5,400),
        new Producto("Q003","Queso",5,800),
        new Producto("Q012","Algo",3,1000)
      ];*/

    constructor(private firestore: AngularFirestore){}

    agregarProducto(producto:Producto): Promise<any>{
        //this.productos.push(producto);
        return this.firestore.collection('productos').add(producto)
    }

    obtenerProductos(orden:string): Observable<any>{
        if(orden == ""){
            return this.firestore.collection('productos', ref => ref.orderBy('nombre', 'asc')).snapshotChanges();
        }else{
            return this.firestore.collection('productos', ref => ref.orderBy(orden, 'asc')).snapshotChanges();
        }
    }

    eliminarProducto(id: string): Promise<any>{
        return this.firestore.collection('productos').doc(id).delete();
    }

    addEditarProducto(producto: Producto){
        this.producto$.next(producto);
    }
    
    getEditarProducto(): Observable<Producto>{
        return this.producto$.asObservable();
    }

    editarProducto(id: string, producto: any): Promise<any>{
        return this.firestore.collection('productos').doc(id).update(producto);
    }

    buscarProducto(id: string): Observable<any>{
        return this.firestore.collection('productos').doc(id).get();
    }
}