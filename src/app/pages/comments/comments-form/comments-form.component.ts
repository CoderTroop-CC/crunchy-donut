import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from './../../../auth/authentication.service';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../../core/api.service';
import { CommentModel } from './../../../core/models/comment.model';

@Component({
  selector: 'app-comments-form',
  templateUrl: './comments-form.component.html',
  styleUrls: ['./comments-form.component.scss']
})
export class CommentsFormComponent implements OnInit, OnDestroy {


  @Input() noteId: string;
  @Input() userComment: CommentModel;
  @Output() submitComment = new EventEmitter();
  isEdit: boolean;
  formComment: CommentModel;
  submitCommentSub: Subscription;
  submitting: boolean;
  error: boolean;


  constructor( private auth: AuthenticationService, private api: ApiService ) { }

  ngOnInit() {
    this.isEdit = !!this.userComment;
    //this._setFormComment();
  }

 /*== private _setFormComment() {
    if (!this.isEdit) {
      // If creating a new Comment,
      // create new CommentModel with default data
      this.formComment = new CommentModel(
        this.auth.userProfile.sub,
        this.auth.userProfile.name,
        this.noteId,
        this.comment <============================== problem why?
      )
    } else {
      // If editing an existing Comment,
      // create new CommentModel from existing data
      this.formComment = new CommentModel(
        this.userComment.userId,
        this.userComment.name,
        this.userComment.noteId,
        this.userComment.comment
      );
    }
  }*/

  onSubmit() {
    this.submitting = true;
    if (!this.isEdit) {
      this.submitCommentSub = this.api
        .postComment$(this.formComment)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    } else {
      this.submitCommentSub = this.api
        .editComment$(this.userComment._id, this.formComment)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    }
  }

  private _handleSubmitSuccess(res) {
    const noteObj = {
      isEdit: this.isEdit,
      comment: res
    };
    this.submitComment.emit(noteObj);
    this.error = false;
    this.submitting = false;
  }

  private _handleSubmitError(err) {
    const noteObj = {
      isEdit: this.isEdit,
      error: err
    };
    this.submitComment.emit(noteObj);
    console.error(err);
    this.submitting = false;
    this.error = true;
  }

  ngOnDestroy() {
    if (this.submitCommentSub) {
      this.submitCommentSub.unsubscribe();
    }
  }

}
