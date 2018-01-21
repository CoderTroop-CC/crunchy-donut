import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title }                        from '@angular/platform-browser';
import { AuthenticationService }        from './../../auth/authentication.service';
import { ApiService }                   from './../../core/api.service';
import { UtilsService }                 from './../../core/utils.service';
import { FilterSortService }            from './../../core/filter-sort.service';
import { ActivatedRoute }                from '@angular/router';
import { Subscription }                 from 'rxjs/Subscription';
import { NoteModel }                    from './../../core/models/note.model';

@Component({
  selector: 'app-user-note',
  templateUrl: './user-note.component.html',
  styleUrls: ['./user-note.component.scss']
})
export class UserNoteComponent implements OnInit, OnDestroy {
  
  pageTitle = 'User Notes';
  email: string;
  routeSub: Subscription;
  notesSub: Subscription;
  note: NoteModel;
  filteredNotes: NoteModel[];
  noteList: NoteModel[];
  loading: boolean;
  error: boolean;
  query = '';

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    public auth: AuthenticationService,
    private api: ApiService,
    public utils: UtilsService,
    public fs: FilterSortService) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this.notesSub = this.route.params
    .subscribe(params => {
      this.email = params['email'];
      this._getUserNoteList();
  });
}

  private _getUserNoteList() {
    this.loading = true;
    this.notesSub = this.api
      .getUserNotes$(this.email)
      .subscribe(
        res => {
          this.noteList = res;
          this.filteredNotes = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }

  searchNotes() {
    this.filteredNotes = this.fs.search(this.noteList, this.query, '_id', 'mediumDate');
  }

  resetQuery() {
    this.query = '';
    this.filteredNotes = this.noteList;
  }

  ngOnDestroy() {
    this.notesSub.unsubscribe();
  }

}