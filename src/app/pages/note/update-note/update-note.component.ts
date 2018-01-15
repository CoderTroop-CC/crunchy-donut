import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from './../../../auth/authentication.service';
import { ApiService } from './../../../core/api.service';
import { UtilsService } from './../../../core/utils.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NoteModel } from './../../../core/models/note.model';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit, OnDestroy {

  pageTitle = 'Update Note';
  routeSub: Subscription;
  noteSub: Subscription;
  note: NoteModel;
  loading: boolean;
  submitting: boolean;
  error: boolean;
  tabSub: Subscription;
  tab: string;
  private _id: string;

  constructor( private route: ActivatedRoute,public auth: AuthenticationService,private api: ApiService,public utils: UtilsService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);

    // Set note ID from route params and subscribe
    this.routeSub = this.route.params
      .subscribe(params => {
        this._id = params['id'];
        this._getNote();
      });

    // Subscribe to query params to watch for tab changes
    this.tabSub = this.route.queryParams
      .subscribe(queryParams => {
        this.tab = queryParams['tab'] || 'edit';
      });
  }

  private _getNote() {
    this.loading = true;
    // GET note by ID
    this.noteSub = this.api
      .getNoteById$(this._id)
      .subscribe(
        res => {
          this.note = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.tabSub.unsubscribe();
    this.noteSub.unsubscribe();
  }

}
