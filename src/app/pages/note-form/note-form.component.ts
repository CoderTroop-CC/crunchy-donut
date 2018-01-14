import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../core/api.service';
import { DatePipe } from '@angular/common';
import { dateValidator } from './../../core/forms/date.validator';
import { dateRangeValidator } from './../../core/forms/date-range.validator';
import { DATE_REGEX, TIME_REGEX, stringsToDate } from './../../core/forms/formUtils.factory';
import { NoteFormService } from './note-form.service';
import { NoteModel, FormNoteModel } from './../../core/models/note.model';

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
  dateGroup: AbstractControl;
  formNote: FormNoteModel;
  formErrors: any;
  formChangeSub: Subscription;
  submitNoteObj: NoteModel;
  submitNoteSub: Subscription;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;

  constructor( private fb: FormBuilder, private api: ApiService, private datePipe: DatePipe, public nf: NoteFormService, private router: Router) { }

  ngOnInit() {
    this.formErrors = this.nf.formErrors;
    this.isEdit = !!this.note;
    this.submitBtnText = this.isEdit ? 'Update Note' : 'Create Note';
    this.formNote = this._setFormNote();
    this._buildForm();
  }

  private _setFormNote() {
    if (!this.isEdit) {
      // If creating a new note, create new
      // FormNoteModel with default null data
      return new FormNoteModel(null, null, null, null);
    } else {
      // If editing existing note, create new
      // FormNoteModel from existing data
      // Transform date:
      // https://angular.io/docs/ts/latest/api/common/index/DatePipe-pipe.html
      // _shortDate: 1/7/2017
      const _shortDate = 'M/d/yyyy';
      return new FormNoteModel(
        this.note.title,
        this.note.content,
        this.datePipe.transform(this.note.createdDate, _shortDate),
        this.note.share
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
        Validators.maxLength(this.nf.descMax)
      ],
      share: [this.formNote.share,
        Validators.required
      ],
      dateGroup: this.fb.group({
        createdDate: [this.formNote.createdDate]
      })
    });

    this.dateGroup = this.noteForm.get('datesGroup');

    // Subscribe to form value changes
    this.formChangeSub = this.noteForm
      .valueChanges
      .subscribe(data => this._onValueChanged());

    // If edit: mark fields dirty to trigger immediate
    // validation in case editing an note that is no longer valid 
    if (this.isEdit) {
      const _markDirty = group => {
        for (const i in group.controls) {
          if (group.controls.hasOwnProperty(i)) {
            group.controls[i].markAsDirty();
          }
        }
      };
      _markDirty(this.noteForm);
      _markDirty(this.dateGroup);
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

    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        if (field !== 'dateGroup') {
          // Set errors for fields not inside datesGroup
          // Clear previous error message (if any)
          this.formErrors[field] = '';
          _setErrMsgs(this.noteForm.get(field), this.formErrors, field);
        } else {
          // Set errors for fields inside datesGroup
          const dateGroupErrors = this.formErrors['dateGroup'];
          for (const dateField in dateGroupErrors) {
            if (dateGroupErrors.hasOwnProperty(dateField)) {
              // Clear previous error message (if any)
              dateGroupErrors[dateField] = '';
              _setErrMsgs(this.dateGroup.get(dateField), dateGroupErrors, dateField);
            }
          }
        }
      }
    }
  }

  private _getSubmitObj() {
    const createdDate = this.dateGroup.get('createdDate').value;

    // Convert form createddate
    // to JS dates and populate a new NoteModel for submission
    return new NoteModel(
      this.noteForm.get('title').value,
      this.noteForm.get('content').value,
      this.noteForm.get('createdDate').value, //change to stringtodate
      this.noteForm.get('share').value,
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
