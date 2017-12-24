import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NoteService } from '../note.service';
//import { NOTES } from '../mock-notes';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  //notes = NOTES;

  getNotes(): void {
    this.notes = this.noteService.getNotes();
  }

  notes: Note[];

  constructor(private noteService: NoteService) {}

  ngOnInit() {
   this.getNotes();
  }

}