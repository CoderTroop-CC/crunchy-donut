import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from './../../auth/authentication.service';
import { ApiService } from './../../core/api.service';
import { FilterSortService } from './../../core/filter-sort.service';
import { UtilsService } from './../../core/utils.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NoteModel } from './../../core/models/note.model';
import { CommentModel } from './../../core/models/comment.model';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, OnDestroy {
  pageTitle: string;
  id: string;
  routeSub: Subscription;
  tabSub: Subscription;
  noteSub: Subscription;
  note: NoteModel;
  filteredNotes: NoteModel[];
  noteList: NoteModel[];
  loading: boolean;
  error: boolean;
  tab: string;
  query = '';
 

  constructor(
    private route: ActivatedRoute,
    public auth: AuthenticationService,
    private api: ApiService,
    public utils: UtilsService,
    public fs: FilterSortService,
    private title: Title) { }

  ngOnInit() {
    // Set note ID from route params and subscribe
    this.routeSub = this.route.params
      .subscribe(params => {
        this.id = params['id'];
        this._getNote();
      });

    // Subscribe to query params to watch for tab changes
    this.tabSub = this.route.queryParams
      .subscribe(queryParams => {
        this.tab = queryParams['tab'] || 'details';
      });
  }

  private _getNote() {
    this.loading = true;
    // GET note by ID
    this.noteSub = this.api
      .getNoteById$(this.id)
      .subscribe(
        res => {
          this.note = res;
          this._setPageTitle(this.note.title);
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
          this._setPageTitle('Note Details');
        }
      );
  }

  private _setPageTitle(title: string) {
    this.pageTitle = title;
    this.title.setTitle(title);
  }

  searchNotes() {
    this.filteredNotes = this.fs.search(this.noteList, this.query, '_id', 'mediumDate');
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.tabSub.unsubscribe();
    this.noteSub.unsubscribe();
  }

}
