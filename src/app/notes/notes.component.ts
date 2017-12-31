import { Component, OnInit } from '@angular/core';

import { Note } from '../note';
import { NoteService } from '../note.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.dataService.getNotes()
    .subscribe(notes => this.notes = notes);
  }

  /*add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.dataService.addNote({ name } as Note)
      .subscribe(note => {
        this.notes.push(note);
      });
  }

  delete(note: Note): void {
    this.notes = this.notes.filter(h => h !== note);
    this.dataService.deleteNote(note).subscribe();
  }*/

}
