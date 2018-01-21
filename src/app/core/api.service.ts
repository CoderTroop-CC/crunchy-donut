import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './../auth/authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { ENV } from './env.config';
import { NoteModel } from './models/note.model';
import { CommentModel } from './models/comment.model';

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

// GET all Notes by user
getUserNotes$(email: string): Observable<NoteModel[]> {
  return this.http
    .get(`${ENV.BASE_API}userNotes/${email}`, {
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

// GET comments by Note ID (login required)
getCommentsByNoteId$(noteId: string): Observable<CommentModel[]> {
  return this.http
    .get(`${ENV.BASE_API}note/${noteId}/comments`, {
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

// DELETE existing Note and all associated comments (admin only)
deleteNote$(id: string): Observable<any> {
  return this.http
    .delete(`${ENV.BASE_API}note/${id}`, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    })
    .catch(this._handleError);
}

// POST new comment (login required)
postComment$(comment: CommentModel): Observable<CommentModel> {
  return this.http
    .post(`${ENV.BASE_API}comment/new`, comment, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    })
    .catch(this._handleError);
}

// PUT existing comment (login required)
editComment$(id: string, comment: CommentModel): Observable<CommentModel> {
  return this.http
    .put(`${ENV.BASE_API}comment/${id}`, comment, {
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
