import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { LoginComponent } from './login/login.component';
import { NoteComponent } from './note/note.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { NotesComponent } from './notes/notes.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './/app-routing.module';
import { Database } from './database-config';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { NoteService } from './note.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'note', component: NoteComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: './home', pathMatch: 'full'}, //take user to notes if URL route is empty
  { path: '**', component: PageNotFoundComponent }//catch-all for URL errors
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NoteComponent,
    SignupComponent,
    HomeComponent,
    NotesComponent,
    PageNotFoundComponent,
    MessagesComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true } // debugging purposes
    ),
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
  providers: [NoteService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

