import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionPublicarRutaComponent } from './confirmacion-publicar-ruta.component';

describe('ConfirmacionPublicarRutaComponent', () => {
  let component: ConfirmacionPublicarRutaComponent;
  let fixture: ComponentFixture<ConfirmacionPublicarRutaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmacionPublicarRutaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionPublicarRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
