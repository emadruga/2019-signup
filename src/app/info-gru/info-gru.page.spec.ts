import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoGruPage } from './info-gru.page';

describe('InfoGruPage', () => {
  let component: InfoGruPage;
  let fixture: ComponentFixture<InfoGruPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoGruPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoGruPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
