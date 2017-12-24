import { Injectable } from '@angular/core';
import { Note } from './note';
import { NOTES } from './mock-notes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';

@Injectable()
export class NoteService {

  getNotes(): Observable<Note[]> {
  // Todo: send the message _after_ fetching the heroes
  this.messageService.add('NoteService: fetched notes');
  return of(NOTES);
}

  constructor(private messageService: MessageService) { }

}
