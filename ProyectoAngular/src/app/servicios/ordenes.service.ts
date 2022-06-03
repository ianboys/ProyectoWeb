import { Injectable } from "@angular/core";
import { Orden } from "../modelos/orden.model";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import * as pdfMake from 'pdfmake/build/pdfMake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
    providedIn: 'root'
})
export class OrdenesService{
    private orden$ = new Subject<any>();
    private paramSource = new BehaviorSubject<Orden[] | undefined>([]);
    sharedParam = this.paramSource.asObservable();

    constructor(private firestore: AngularFirestore){}

    agregarOrden(orden:Orden): Promise<any>{
        return this.firestore.collection('ordenes').add(orden)
    }

    obtenerOrdenes(acomodo:string): Observable<any>{
        if(acomodo == ""){
            return this.firestore.collection('ordenes', ref => ref.orderBy('inVoice', 'asc')).snapshotChanges();
        }else{
            return this.firestore.collection('ordenes', ref => ref.orderBy(acomodo, 'asc')).snapshotChanges();
        }
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

    sendParam(param: Orden[] | undefined) {
        this.paramSource.next(param);
    }

    createPDF(param: Orden[]) {
        let pdfDefinition = {
          pageSize : 'A4',
          content: [
            {
              columns:[
                {text: 'Date', style: 'header', alignment: 'justify', margin: [200, 0, 0, 0]},
                {text: 'Invoice', style: 'header', alignment: 'justify', margin: [100, 0, 0, 0]},
                {text: 'P.O No', style: 'header', alignment: 'justify', margin: [10, 0, 0, 0]},
              ]
            },
            {
                columns:[
                  {text: param[0].fecha, style: 'header', alignment: 'justify', margin: [190, 0, 0, 0]},
                  {text: param[0].inVoice, style: 'header', alignment: 'justify', margin: [70, 0, 0, 0]}
                ]
              },
            {
              style: 'tableExample',
              alignment: 'center',
              table: {
                widths: [80,80,80,80,80,80],
                body: [
                  ['Item', 'Quantity', 'Description','Case','Rate','Amount'],
                  [param[0].productos[0].idProducto, param[0].productos[0].cantidad, param[0].productos[0].nombre,param[0].productos[0].cantidadCaja,param[0].productos[0].precioUnitario,param[0].productos[0].importeTotal]
                ]
              }
            }
          ]
        };
        pdfMake.createPdf(pdfDefinition).open();
      }
}