import { Component, Input }       from '@angular/core';
import { AuthenticationService }  from './../../../auth/authentication.service';
import { UtilsService }           from './../../../core/utils.service';
import { NoteModel }              from './../../../core/models/note.model';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent {
  @Input() note: NoteModel;

  constructor(public utils: UtilsService, public auth: AuthenticationService) { }

}