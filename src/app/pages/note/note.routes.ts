import { Routes } from '@angular/router';
import { NoteComponent } from './note.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { UpdateNoteComponent } from './update-note/update-note.component';

export const NOTE_ROUTES: Routes = [
  { path: '', component: NoteComponent },
  { path: ':id', component: NoteComponent },
  { path: 'note/new', component: CreateNoteComponent },
  { path: 'update/:id', component: UpdateNoteComponent },
  { path: 'userNote', component: NoteComponent }
];