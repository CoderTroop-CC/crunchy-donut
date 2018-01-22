import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../../core/core.module';
import { RouterModule } from '@angular/router';
import { NOTE_ROUTES } from './note.routes';
import { NoteComponent } from './note.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { UpdateNoteComponent } from './update-note/update-note.component';
import { NoteFormComponent } from './note-form/note-form.component';
import { DeleteNoteComponent } from './delete-note/delete-note.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentsFormComponent } from './comments/comments-form/comments-form.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(NOTE_ROUTES)
  ],
  declarations: [
    NoteComponent,
    CreateNoteComponent,
    UpdateNoteComponent,
    NoteFormComponent,
    DeleteNoteComponent,
    NoteDetailComponent,
    CommentsComponent,
    CommentsFormComponent
  ]
})
export class NoteModule { }