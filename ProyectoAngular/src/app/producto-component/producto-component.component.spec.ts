import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoComponentComponent } from './producto-component.component';

describe('ProductoComponentComponent', () => {
  let component: ProductoComponentComponent;
  let fixture: ComponentFixture<ProductoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
