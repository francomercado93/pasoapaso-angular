import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarLocacionesComponent } from './administrar-locaciones.component';

describe('AdministrarLocacionesComponent', () => {
  let component: AdministrarLocacionesComponent;
  let fixture: ComponentFixture<AdministrarLocacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarLocacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarLocacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
