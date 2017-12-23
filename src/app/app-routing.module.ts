import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './notes/notes.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NoteComponent } from './note/note.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'note', component: NoteComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: '/home' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}