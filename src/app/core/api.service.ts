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

  // GET list of user notes
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
  getSharingByNoteId$(noteId: string): Observable<sharingModel[]> {
    return this.http
      .get(`${ENV.BASE_API}note/${noteId}/share`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .catch(this._handleError);
  }

  postNotes$(note: NoteModel): Observable<NoteModel> {
    return this.http
      .post(`${ENV.BASE_API}note/new`, note, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .catch(this._handleError);
  }

  // PUT existing note (admin only)
  editNotes$(id: string, note: NoteModel): Observable<NoteModel> {
    return this.http
      .put(`${ENV.BASE_API}note/${id}`, note, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .catch(this._handleError);
  }

  // DELETE existing note and all associated sharing (admin only)
  deleteNotes$(id: string): Observable<any> {
    return this.http
      .delete(`${ENV.BASE_API}note/${id}`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .catch(this._handleError);
  }

  // GET all note a specific user has shared to (login required)
  getUserNotes$(userId: string): Observable<NoteModel[]> {
    return this.http
      .get(`${ENV.BASE_API}notes/${userId}`, {
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

  // POST new note (admin only)
  postNote$(note: NoteModel): Observable<NoteModel> {
    return this.http
      .post(`${ENV.BASE_API}note/new`, note, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .catch(this._handleError);
  }

  // PUT existing note (admin only)
  editNote$(id: string, note: NoteModel): Observable<NoteModel> {
    return this.http
      .put(`${ENV.BASE_API}note/${id}`, note, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .catch(this._handleError);
  }

  // DELETE existing note and all associated shares (admin only)
  deleteNote$(id: string): Observable<any> {
    return this.http
      .delete(`${ENV.BASE_API}note/${id}`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .catch(this._handleError);
  }

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
}
