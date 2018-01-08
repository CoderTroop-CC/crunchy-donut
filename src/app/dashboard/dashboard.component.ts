import { Component, OnInit,OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from './../core/api.service';
import { UtilsService } from './../core/utils.service';
import { FilterSortService } from './../core/filter-sort.service';
import { Subscription } from 'rxjs/Subscription';
import { NoteModel } from './../core/models/Note.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  pageTitle = "Dashboard";
  noteListSub: Subscription;
  noteList: NoteModel[];
  filteredNotes: NoteModel[];
  loading: boolean;
  error: boolean;
  query: '';
  
  constructor(
    private title: Title,
    public utils: UtilsService,
    private api: ApiService,
    public fs: FilterSortService
  ) { }

  ngOnInit() {
    this._getNoteList();
    this.title.setTitle(this.pageTitle);
  }

  private _getNoteList() {
    this.loading = true;
    // Get future, public events
    this.noteListSub = this.api
      .getNotes$()
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
    this.noteListSub.unsubscribe();
  }

}
