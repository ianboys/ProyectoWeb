import { Injectable } from "@angular/core";
import { Cliente } from "../modelos/cliente.model";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ClienteService{
    private cliente$ = new Subject<any>();

    constructor(private firestore: AngularFirestore){}

    agregarCliente(cliente:Cliente): Promise<any>{
        //this.productos.push(producto);

        return this.firestore.collection('clientes').add(cliente)
    }

    obtenerClientes(): Observable<any>{
        return this.firestore.collection('clientes', ref => ref.orderBy('nombre', 'asc')).snapshotChanges();
    }

    eliminarCliente(id: string): Promise<any>{
        return this.firestore.collection('clientes').doc(id).delete();
    }

    addEditarCliente(cliente: Cliente){
        this.cliente$.next(cliente);
    }
    
    getEditarCliente(): Observable<Cliente>{
        return this.cliente$.asObservable();
    }

    editarCliente(id: string, cliente: any): Promise<any>{
        return this.firestore.collection('clientes').doc(id).update(cliente);
    }
}