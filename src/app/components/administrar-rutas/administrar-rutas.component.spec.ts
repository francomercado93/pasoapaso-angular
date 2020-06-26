import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarRutasComponent } from './administrar-rutas.component';

describe('AdministrarRutasComponent', () => {
  let component: AdministrarRutasComponent;
  let fixture: ComponentFixture<AdministrarRutasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarRutasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
