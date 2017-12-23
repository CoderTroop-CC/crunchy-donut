import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NoteComponent } from './note/note.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { NotesComponent } from './notes/notes.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './/app-routing.module';
import { Database } from './database-config';


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
    PageNotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true } // debugging purposes
    ),
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
