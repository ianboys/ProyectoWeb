import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDetalleComponentComponent } from './orden-detalle-component.component';

describe('OrdenDetalleComponentComponent', () => {
  let component: OrdenDetalleComponentComponent;
  let fixture: ComponentFixture<OrdenDetalleComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenDetalleComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenDetalleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
