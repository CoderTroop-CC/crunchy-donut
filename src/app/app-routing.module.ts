import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SplashComponent }        from './pages/splash/splash.component';
import { DashboardComponent }   from './pages/dashboard/dashboard.component';
import { NoteComponent }        from './pages/note/note.component';
import { NoteDetailComponent }  from './pages/note/note-detail/note-detail.component';
import { CreateNoteComponent } from './pages/note/create-note/create-note.component';
import { UpdateNoteComponent } from './pages/note/update-note/update-note.component';

//login and authentication
import { AuthGuard }            from './auth/auth-guard';
import { AdminGuard }           from './auth/admin.guard';
import { AdminComponent }       from './pages/admin/admin.component';
import { CallbackComponent }    from './pages/callback/callback.component';

const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'callback', component: CallbackComponent },
  { path: 'note/:id', component: NoteComponent, canActivate: [AuthGuard]},
  { path: 'note/new', component: CreateNoteComponent},
  { path: 'note/update/:id', component: UpdateNoteComponent },
  { path: 'userNotes', canActivate: [AuthGuard,],
    children: [
      { path: '', component: AdminComponent},
      { path: 'note/update/:id', component: UpdateNoteComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ AuthGuard, AdminGuard ]
})
export class AppRoutingModule {} 
