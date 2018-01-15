import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './../auth/authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { ENV } from './env.config';
import { NoteModel } from './models/note.model';
import { sharingModel } from './models/sharing.model';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  private get _authHeader(): string {
    return `Bearer ${localStorage.getItem('access_token')}`;
  }

 // GET list of public, future notes
 getNotes$(): Observable<NoteModel[]> {
  return this.http
    .get(`${ENV.BASE_API}notes`)
    .catch(this._handleError);
}

// GET all Notes - private and public (admin only)
getAdminNotes$(): Observable<NoteModel[]> {
  return this.http
    .get(`${ENV.BASE_API}notes/admin`, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    })
    .catch(this._handleError);
}

// GET an Note by ID (login required)
getNoteById$(id: string): Observable<NoteModel> {
  return this.http
    .get(`${ENV.BASE_API}note/${id}`, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    })
    .catch(this._handleError);
}

// GET shares by Note ID (login required)
getSharesByNoteId$(noteId: string): Observable<sharingModel[]> {
  return this.http
    .get(`${ENV.BASE_API}note/${noteId}/shares`, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    })
    .catch(this._handleError);
}

// POST new Note 
postNote$(note: NoteModel): Observable<NoteModel> {
  return this.http
    .post(`${ENV.BASE_API}note/new`, note, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    })
    .catch(this._handleError);
}

// PUT existing Note 
editNote$(id: string, note: NoteModel): Observable<NoteModel> {
  return this.http
    .put(`${ENV.BASE_API}note/${id}`, note, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    })
    .catch(this._handleError);
}

// DELETE existing Note and all associated Shares (admin only)
deleteNote$(id: string): Observable<any> {
  return this.http
    .delete(`${ENV.BASE_API}note/${id}`, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    })
    .catch(this._handleError);
}

// GET all Notes a specific user has Shareed to (login required)
getUserNotes$(userId: string): Observable<NoteModel[]> {
  return this.http
    .get(`${ENV.BASE_API}notes/${userId}`, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    })
    .catch(this._handleError);
}

// POST new Share (login required)
postShare$(share: sharingModel): Observable<sharingModel> {
  return this.http
    .post(`${ENV.BASE_API}share/new`, share, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    })
    .catch(this._handleError);
}

// PUT existing share (login required)
editShare$(id: string, share: sharingModel): Observable<sharingModel> {
  return this.http
    .put(`${ENV.BASE_API}share/${id}`, share, {
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
