import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteComponentComponent } from './cliente-component.component';

describe('ClienteComponentComponent', () => {
  let component: ClienteComponentComponent;
  let fixture: ComponentFixture<ClienteComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
