import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdenComponentComponent } from './orden-component/orden-component.component';
import { ClienteComponentComponent } from './cliente-component/cliente-component.component';
import { ProductoComponentComponent } from './producto-component/producto-component.component';
import { OrdenDetalleComponentComponent } from './orden-detalle-component/orden-detalle-component.component';
import { OrdenDesgloseComponentComponent } from './orden-desglose-component/orden-desglose-component.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdenComponentComponent,
    ClienteComponentComponent,
    ProductoComponentComponent,
    OrdenDetalleComponentComponent,
    OrdenDesgloseComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
