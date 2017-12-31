import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { NoteDetailComponent }  from './note-detail/note-detail.component';
import { NoteAddComponent } from './note-add/note-add.component';
import { NoteSearchComponent } from './note-search/note-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: NoteDetailComponent },
  { path: 'addNote', component: NoteAddComponent },
  { path: 'noteSearch', component: NoteSearchComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
