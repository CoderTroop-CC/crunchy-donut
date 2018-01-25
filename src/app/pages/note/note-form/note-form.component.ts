import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthenticationService } from './../../../auth/authentication.service';
import { ApiService } from './../../../core/api.service';
import { NoteFormService } from './note-form.service';
import { NoteModel, FormNoteModel } from './../../../core/models/note.model';
import { NullAstVisitor } from '@angular/compiler';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
  providers: [ NoteFormService ]
})

export class NoteFormComponent implements OnInit, OnDestroy {

  @Input() note: NoteModel;
  isEdit: boolean;
  noteForm: FormGroup;
  formNote: FormNoteModel;
  formErrors: any;
  formChangeSub: Subscription;
  submitNoteObj: NoteModel;
  submitNoteSub: Subscription;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;
  routeSub: Subscription;
  commentsSub: Subscription;
  email: string;
  //noteId: string;

  constructor( 
    private route: ActivatedRoute,
    private fb: FormBuilder, 
    public auth: AuthenticationService,
    private api: ApiService, 
    public nf: NoteFormService, 
    private router: Router) { }

  ngOnInit() {
    this.formErrors = this.nf.formErrors;
    this.isEdit = !!this.note;
    this.submitBtnText = this.isEdit ? 'Update Note' : 'Create Note';
    this.commentsSub = this.route.params.subscribe(params => {
      this.email = params['email'];
    this.formNote = this._setFormNote();
  })
    
    this._buildForm();
  }

  private _setFormNote() {
    if (!this.isEdit) {
      // If creating a new Note, create new
      // FormNoteModel with default null data
      return new FormNoteModel(null, null, null, null);
    } else {
      // If editing existing Note, create new
      // FormNoteModel from existing data
      return new FormNoteModel(
        this.note.title,
        this.note.content,
        this.note.email,
        this.note.publicView
        
      );
    } 
  }

  private _buildForm() {
    this.noteForm = this.fb.group({
      title: [this.formNote.title, [
        Validators.required,
        Validators.minLength(this.nf.textMin),
        Validators.maxLength(this.nf.titleMax)
      ]],
      content: [this.formNote.content,
        Validators.maxLength(this.nf.contMax)
      ],
      email: [this.formNote.email,
        Validators.required
      ],
      publicView: [this.formNote.publicView,
        Validators.required
      ]
    });
        // Subscribe to form value changes
    this.formChangeSub = this.noteForm
      .valueChanges
      .subscribe(data => this._onValueChanged());

    // If edit: mark fields dirty to trigger immediate
    // validation in case editing an note that is no
    // longer valid (for example, an note in the past)
    if (this.isEdit) {
      const _markDirty = group => {
        for (const i in group.controls) {
          if (group.controls.hasOwnProperty(i)) {
            group.controls[i].markAsDirty();
          }
        }
      };
      _markDirty(this.noteForm);
    }

    this._onValueChanged();
  }

  private _onValueChanged() {
    if (!this.noteForm) { return; }
    const _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
      if (control && control.dirty && control.invalid) {
        const messages = this.nf.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            errorsObj[field] += messages[key] + '<br>';
          }
        }
      }
    };
  }

  private _getSubmitObj() {
    
    return new NoteModel(
      this.noteForm.get('title').value,
      this.noteForm.get('content').value,
      this.noteForm.get('email').value,
      this.noteForm.get('publicView').value,
      this.note ? this.note._id : null
    );
    
  }

  onSubmit() {
    this.submitting = true;
    this.submitNoteObj = this._getSubmitObj();

    if (!this.isEdit) {
      this.submitNoteSub = this.api
        .postNote$(this.submitNoteObj)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    } else {
      this.submitNoteSub = this.api
        .editNote$(this.note._id, this.submitNoteObj)
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
    this.router.navigate(['/note', res._id]);
  }

  private _handleSubmitError(err) {
    console.error(err);
    this.submitting = false;
    this.error = true;
  }

  resetForm() {
    this.noteForm.reset();
  }

  ngOnDestroy() {
    if (this.submitNoteSub) {
      this.submitNoteSub.unsubscribe();
    }
    this.formChangeSub.unsubscribe();
  }


}