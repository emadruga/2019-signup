import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcaoCotasPage } from './opcao-cotas.page';

describe('OpcaoCotasPage', () => {
  let component: OpcaoCotasPage;
  let fixture: ComponentFixture<OpcaoCotasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcaoCotasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcaoCotasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
