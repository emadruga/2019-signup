import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GruFieldsPage } from './gru-fields.page';

describe('GruFieldsPage', () => {
  let component: GruFieldsPage;
  let fixture: ComponentFixture<GruFieldsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruFieldsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruFieldsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
