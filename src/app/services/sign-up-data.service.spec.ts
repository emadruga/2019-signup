import { TestBed, inject } from '@angular/core/testing';

import { SignUpDataService } from './sign-up-data.service';

describe('SignUpDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignUpDataService]
    });
  });

  it('should be created', inject([SignUpDataService], (service: SignUpDataService) => {
    expect(service).toBeTruthy();
  }));
});
