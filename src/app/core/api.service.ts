import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './../auth/authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { ENV } from './env.config';
import { NoteModel } from './models/note.model';
import { SharingModel } from './models/Sharing.model';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService) { }

  private get _authHeader(): string {
    return `Bearer ${localStorage.getItem('access_token')}`;
  }

  // GET list notes
  getNotes$(): Observable<NoteModel[]> {
    return this.http
      .get(`${ENV.BASE_API}notes`)
      .catch(this._handleError);
  }

  // GET all notes 
  getAdminNotes$(): Observable<NoteModel[]> {
    return this.http
      .get(`${ENV.BASE_API}notes/admin`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .catch(this._handleError);
  }

  // GET an note by ID
  getNotesById$(id: string): Observable<NoteModel> {
    return this.http
      .get(`${ENV.BASE_API}note/${id}`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .catch(this._handleError);
  }

  // GET shareing by note ID 
  getSharingByNoteId$(noteId: string): Observable<SharingModel[]> {
    return this.http
      .get(`${ENV.BASE_API}note/${noteId}/collaborators`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .catch(this._handleError);
  }

  private _handleError(err: HttpErrorResponse | any) {
    const errorMsg = err.message || 'Error: Unable to complete request.';
    if (err.message && err.message.indexOf('No JWT present') > -1) {
      this.auth.login();
    }
    return Observable.throw(errorMsg);
  }

}
