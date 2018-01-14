import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from './../../auth/authentication.service';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../core/api.service';
import { GUESTS_REGEX } from './../../core/forms/formUtils.factory';
import { sharingModel } from './../../core/models/sharing.model';

@Component({
  selector: 'app-share-form',
  templateUrl: './share-form.component.html',
  styleUrls: ['./share-form.component.scss']
})
export class ShareFormComponent implements OnInit, OnDestroy {

  @Input() noteId: string;
  @Input() share: sharingModel;
  @Output() submitShare = new EventEmitter();
  GUESTS_REGEX = GUESTS_REGEX;
  isEdit: boolean;
  formSharing: sharingModel;
  submitShareSub: Subscription;
  submitting: boolean;
  error: boolean;


  constructor( private auth: AuthenticationService, private api: ApiService ) { }

  ngOnInit() {
    this.isEdit = !!this.share;
    this._setFormShare();
  }

  private _setFormShare() {
    if (!this.isEdit) {
      // If creating a new share,
      // create new sharingModel with default data
      this.formSharing = new sharingModel(
        this.auth.userProfile.sub,
        this.auth.userProfile.userName,
        this.noteId,
        true);
    } else {
      // If editing an existing share,
      // create new SharingModel from existing data
      this.formSharing = new sharingModel(
        this.share.userId,
        this.share.name,
        this.share.noteId,
        this.share.attending
      );
    }
  }

  onSubmit() {
    this.submitting = true;
    if (!this.isEdit) {
      this.submitShareSub = this.api
        .postShare$(this.formSharing)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    } else {
      this.submitShareSub = this.api
        .editShare$(this.share._id, this.formSharing)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    }
  }

  private _handleSubmitSuccess(res) {
    const noteObj = {
      isEdit: this.isEdit,
      share: res
    };
    this.submitShare.emit(noteObj);
    this.error = false;
    this.submitting = false;
  }

  private _handleSubmitError(err) {
    const noteObj = {
      isEdit: this.isEdit,
      error: err
    };
    this.submitShare.emit(noteObj);
    console.error(err);
    this.submitting = false;
    this.error = true;
  }

  ngOnDestroy() {
    if (this.submitShareSub) {
      this.submitShareSub.unsubscribe();
    }
  }

}
