import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { AuthenticationService } from './../../../../auth/authentication.service';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../../../core/api.service';
import { CommentModel, FormCommentModel } from './../../../../core/models/comment.model';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommentsFormService } from './comments-form.service';


@Component({
  selector: 'app-comments-form',
  templateUrl: './comments-form.component.html',
  styleUrls: ['./comments-form.component.scss'],
  providers: [ CommentsFormService ]
})
export class CommentsFormComponent implements OnInit, OnDestroy {


  @Input() noteId: string;
  @Input() comment: CommentModel;
  isEdit: boolean;
  routeSub: Subscription;
  commentForm: FormGroup;
  formComment: CommentModel;
  formErrors: any;
  formChangeSub: Subscription;
  comments: string;
  submitCommentSub: Subscription;
  submitCommentObj: CommentModel;
  submitting: boolean;
  submitBtnText: string;
  error: boolean;

  constructor(
    private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private api: ApiService, 
    public cf: CommentsFormService, 
    private router: Router, 
    public auth: AuthenticationService ) { }

  ngOnInit() {
    this.formErrors = this.cf.formErrors;
    this.isEdit = !!this.comment;
    this.submitBtnText = this.isEdit ? 'Update Comment' : 'Create Comment';
    this.routeSub = this.route.params.subscribe(params => {
      this.noteId = params['id'];
      this.formComment = this._setFormComment();
      this._buildForm();
    });
  }

 private _setFormComment() {
    if (!this.isEdit) {
      // create new comment
      return new FormCommentModel(this.noteId, null, null);
    } else {
      // If editing an existing Comment,
      // create new CommentModel from existing data
      return new FormCommentModel(
        //this.comment.userId,
        this.comment.noteId,
        this.comment.email,
        this.comment.content
      );
    }
  }

  private _buildForm() {
    this.commentForm = this.fb.group({
      userId: this.auth.userProfile.sub,
      noteId: this.noteId,
      email: this.auth.userProfile.name,
      content: [this.formComment.content, [
        Validators.required
      ]]
    });

    // Subscribe to form value changes
    this.formChangeSub = this.commentForm
    .valueChanges
    .subscribe(data => this._onValueChanged());
 
    // If edit: mark fields dirty to trigger immediate
    // validation in case editing an note
    if (this.isEdit) {
      const _markDirty = group => {
        for (const i in group.controls) {
          if (group.controls.hasOwnProperty(i)) {
            group.controls[i].markAsDirty();
          }
        }
      };
      _markDirty(this.commentForm);
    }
 
    this._onValueChanged();
  }

  private _onValueChanged() {
    if (!this.commentForm) { return; }
    const _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
      if (control && control.dirty && control.invalid) {
        const messages = this.cf.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            errorsObj[field] += messages[key] + '<br>';
          }
        }
      }
    };
  }

  private _getSubmitObj() {
    
    return new CommentModel(
      this.noteId,
      this.commentForm.get('email').value,
      this.commentForm.get('content').value,
      this.comment ? this.comment._id : null
    );
  }


    onSubmit() {
      this.submitting = true;
      this.submitCommentObj = this._getSubmitObj();
  
      if (!this.isEdit) {
        this.submitCommentSub = this.api
          .postComment$(this.submitCommentObj)
          .subscribe(
            data => this._handleSubmitSuccess(data),
            err => this._handleSubmitError(err)
          );
      } else {
        this.submitCommentSub = this.api
          .editComment$(this.comment._id, this.submitCommentObj)
          .subscribe(
            data => this._handleSubmitSuccess(data),
            err => this._handleSubmitError(err)
          );
      }
    }
  
    private _handleSubmitSuccess(res) {
      this.error = false;
      this.submitting = false;
      // Redirect to note detail
      this.router.navigate(['/note', res.noteId]);
    }
  
    private _handleSubmitError(err) {
      console.error(err);
      this.submitting = false;
      this.error = true;
    }
  
    resetForm() {
      this.commentForm.reset();
    }
  
    ngOnDestroy() {
      if (this.submitCommentSub) {
        this.submitCommentSub.unsubscribe();
      }
      this.formChangeSub.unsubscribe();
    }
  
  
  }
