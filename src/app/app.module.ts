import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { NoteDetailComponent }  from './note-detail/note-detail.component';
import { NotesComponent }      from './notes/notes.component';
import { NoteSearchComponent }  from './note-search/note-search.component';
import { NoteService }          from './note.service';
import { NoteAddComponent } from './note-add/note-add.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    NotesComponent,
    NoteDetailComponent,
    NoteSearchComponent,
    NoteAddComponent
  ],
  providers: [ NoteService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
