import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenComponentComponent } from './orden-component.component';

describe('OrdenComponentComponent', () => {
  let component: OrdenComponentComponent;
  let fixture: ComponentFixture<OrdenComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
