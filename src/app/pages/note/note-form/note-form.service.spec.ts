import { TestBed, inject } from '@angular/core/testing';

import { NoteFormService } from './note-form.service';

describe('NoteFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoteFormService]
    });
  });

  it('should be created', inject([NoteFormService], (service: NoteFormService) => {
    expect(service).toBeTruthy();
  }));
});
