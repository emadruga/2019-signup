import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoIsencaoPage } from './info-isencao.page';

describe('InfoIsencaoPage', () => {
  let component: InfoIsencaoPage;
  let fixture: ComponentFixture<InfoIsencaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoIsencaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoIsencaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
