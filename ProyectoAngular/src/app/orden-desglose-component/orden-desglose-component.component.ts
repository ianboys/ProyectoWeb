import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orden-desglose-component',
  templateUrl: './orden-desglose-component.component.html',
  styleUrls: ['./orden-desglose-component.component.css']
})
export class OrdenDesgloseComponentComponent implements OnInit {
  titulo = "Ordenes";

  constructor() { }

  ngOnInit(): void {
  }

}
