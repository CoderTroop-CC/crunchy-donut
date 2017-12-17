import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
  { path: 'test', component: AppComponent},
  //{ path: 'login', component: LoginComponent}, //login page
  //{ path: 'notes', component: NotesComponent}, //landing page / note list
  //{ path: 'note/:id', component: NoteComponent}, //expanded single note view
  //{ path: '', redirectTo: './notes', pathMatch: 'full'}, //take user to notes if URL route is empty
  //{ path: '**', component: PageNotFoundComponent }//catch-all for URL errors
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true } // debugging purposes
    ),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
