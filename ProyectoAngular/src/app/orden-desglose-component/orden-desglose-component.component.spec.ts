import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDesgloseComponentComponent } from './orden-desglose-component.component';

describe('OrdenDesgloseComponentComponent', () => {
  let component: OrdenDesgloseComponentComponent;
  let fixture: ComponentFixture<OrdenDesgloseComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenDesgloseComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenDesgloseComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
