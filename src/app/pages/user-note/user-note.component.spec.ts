import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNoteComponent } from './user-note.component';

describe('UserNoteComponent', () => {
  let component: UserNoteComponent;
  let fixture: ComponentFixture<UserNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
