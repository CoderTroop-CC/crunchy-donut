import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-add',
  templateUrl: './note-add.component.html',
  styleUrls: ['./note-add.component.css']
})
export class NoteAddComponent implements OnInit {
  notes: Note[];

  constructor(private noteService: NoteService) { }

  ngOnInit() { }

  add(name: string, content: string): void {
    console.log('add() called ' + 'with name as ' + name + ' and content as ' + content);
    name = name.trim();
    content = content.trim();

    if (!name || !content) { return; }
    this.noteService.addNote({ name, content } as Note)
      .subscribe(note => {
        this.notes.push(note);
      });
  }

}