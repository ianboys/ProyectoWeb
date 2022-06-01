import { Injectable } from "@angular/core";
import { Orden } from "../modelos/orden.model";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class OrdenesService{
    private orden$ = new Subject<any>();
    private paramSource = new BehaviorSubject<Orden[]>([]);
    sharedParam = this.paramSource.asObservable();

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

    buscarOrden(id: string | undefined): Observable<any>{
        return this.firestore.collection('ordenes').doc(id).get();
    }

    sendParam(param: Orden[]) {
        this.paramSource.next(param);
    }
}