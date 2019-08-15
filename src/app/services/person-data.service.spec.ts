import { TestBed, inject } from '@angular/core/testing';

import { PersonDataService } from './person-data.service';

describe('PersonDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonDataService]
    });
  });

  it('should be created', inject([PersonDataService], (service: PersonDataService) => {
    expect(service).toBeTruthy();
  }));
});
