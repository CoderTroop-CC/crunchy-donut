import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title }                        from '@angular/platform-browser';
import { AuthenticationService }        from './../../auth/authentication.service';
import { ApiService }                   from './../../core/api.service';
import { UtilsService }                 from './../../core/utils.service';
import { FilterSortService }            from './../../core/filter-sort.service';
import { Subscription }                 from 'rxjs/Subscription';
import { NoteModel }                    from './../../core/models/note.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  
  pageTitle = 'User Notes';
  notesSub: Subscription;
  noteList: NoteModel[];
  filteredNotes: NoteModel[];
  loading: boolean;
  error: boolean;
  query = '';

  constructor(
    private title: Title,
    public auth: AuthenticationService,
    private api: ApiService,
    public utils: UtilsService,
    public fs: FilterSortService) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getNoteList();
  }

  private _getNoteList() {
    this.loading = true;
    this.notesSub = this.api
      .getAdminNotes$()
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