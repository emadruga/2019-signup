import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueroCotasPage } from './quero-cotas.page';

describe('QueroCotasPage', () => {
  let component: QueroCotasPage;
  let fixture: ComponentFixture<QueroCotasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueroCotasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueroCotasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
