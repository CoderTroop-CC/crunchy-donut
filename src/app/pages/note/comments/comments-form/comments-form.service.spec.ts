import { TestBed, inject } from '@angular/core/testing';

import { CommentsFormService } from './comments-form.service';

describe('CommentsFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentsFormService]
    });
  });

  it('should be created', inject([CommentsFormService], (service: CommentsFormService) => {
    expect(service).toBeTruthy();
  }));
});
