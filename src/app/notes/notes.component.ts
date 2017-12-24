import { Component, OnInit } from '@angular/core';

import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[];

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getNotes()
    .subscribe(notes => this.notes = notes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.noteService.addNote({ name } as Note)
      .subscribe(note => {
        this.notes.push(note);
      });
  }

  delete(note: Note): void {
    this.notes = this.notes.filter(h => h !== note);
    this.noteService.deleteNote(note).subscribe();
  }

}
