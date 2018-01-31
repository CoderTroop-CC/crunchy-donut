import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SplashComponent }        from './pages/splash/splash.component';
import { DashboardComponent }   from './pages/dashboard/dashboard.component';
import { CallbackComponent }    from './pages/callback/callback.component';
import { UserNoteComponent }   from './pages/user-note/user-note.component';

//login and authentication
import { AuthGuard }            from './auth/auth-guard';
import { AdminGuard }           from './auth/admin.guard';


const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'note', loadChildren: './pages/note/note.module#NoteModule', canActivate: [AuthGuard]},
  { path: 'callback', component: CallbackComponent },
  { path: 'userNotes/:email', component: UserNoteComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ AuthGuard, AdminGuard ]
})
export class AppRoutingModule {} 
