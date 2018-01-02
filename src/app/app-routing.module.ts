import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { NoteDetailComponent }  from './note-detail/note-detail.component';
import { NoteAddComponent }     from './note-add/note-add.component';
import { NoteSearchComponent }  from './note-search/note-search.component';

//login and authentication
import { LoginComponent }       from './login/login.component';
import { RegisterComponent }    from './register/register.component';
import { AuthGuard }            from './auth-guard';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: NoteDetailComponent },
  { path: 'addNote', component: NoteAddComponent, canActivate: [AuthGuard] },
  { path: 'noteSearch', component: NoteSearchComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
