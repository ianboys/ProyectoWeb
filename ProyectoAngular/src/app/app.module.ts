import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdenComponentComponent } from './orden-component/orden-component.component';
import { ClienteComponentComponent } from './cliente-component/cliente-component.component';
import { ProductoComponentComponent } from './producto-component/producto-component.component';
import { OrdenDesgloseComponentComponent } from './orden-desglose-component/orden-desglose-component.component';
import { RouterModule, Routes} from '@angular/router';
import { ProductosService } from './servicios/productos.service';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



const appRoutes:Routes=[
  {path:'',component:OrdenComponentComponent},
  {path:'clientes', component:ClienteComponentComponent},
  {path:'catalogo', component:ProductoComponentComponent},
  {path:'ordenes', component:OrdenDesgloseComponentComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    OrdenComponentComponent,
    ClienteComponentComponent,
    ProductoComponentComponent,
    OrdenDesgloseComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    NgbModule
  ],
  providers: [ProductosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
