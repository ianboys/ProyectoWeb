import { Injectable } from "@angular/core";
import { Orden } from "../modelos/orden.model";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class OrdenesService{
    private orden$ = new Subject<any>();

    constructor(private firestore: AngularFirestore){}

    agregarOrden(orden:Orden): Promise<any>{
        return this.firestore.collection('ordenes').add(orden)
    }

    obtenerOrdenes(): Observable<any>{
        return this.firestore.collection('ordenes', ref => ref.orderBy('fecha', 'asc')).snapshotChanges();
    }

    eliminarOrden(id: string): Promise<any>{
        return this.firestore.collection('ordenes').doc(id).delete();
    }

    addEditarOrden(orden: Orden){
        this.orden$.next(orden);
    }
    
    getEditarOrden(): Observable<Orden>{
        return this.orden$.asObservable();
    }

    editarOrden(id: string, orden: any): Promise<any>{
        return this.firestore.collection('ordenes').doc(id).update(orden);
    }

    buscarOrden(fecha: string): Observable<any>{
        return this.firestore.collection('ordenes', ref => ref.where("fecha", "==", fecha)).snapshotChanges();
    }
}