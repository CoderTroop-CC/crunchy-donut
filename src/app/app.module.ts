import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//routing
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashComponent } from './pages/splash/splash.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NoteComponent } from './pages/note/note.component';
import { CreateNoteComponent } from './pages/note/create-note/create-note.component';
import { NoteDetailComponent } from './pages/note/note-detail/note-detail.component';
import { UpdateNoteComponent } from './pages/note/update-note/update-note.component';
import { DeleteNoteComponent } from './pages/note/delete-note/delete-note.component';
import { MessagesComponent } from './messages/messages.component';
import { CommentsComponent } from './pages/comments/comments.component';


//services and helpers
import { JwtInterceptor } from './jwt-interceptor';
import { AuthenticationService } from './auth/authentication.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { ApiService } from './core/api.service';
import { UtilsService } from './core/utils.service';
import { FilterSortService } from './core/filter-sort.service';
import { DatePipe } from '@angular/common';
import { AuthGuard } from './auth/auth-guard';
import { AdminGuard } from './auth/admin.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { NoteFormComponent } from './pages/note/note-form/note-form.component';
import { NoteFormService } from './pages/note/note-form/note-form.service';
import { SubmittingComponent } from './core/submitting.component';
import { CommentsFormComponent } from './pages/comments/comments-form/comments-form.component';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],

  declarations: [
    AppComponent,
    DashboardComponent,
    NoteDetailComponent,
    MessagesComponent,
    HeaderComponent,
    FooterComponent,
    CallbackComponent,
    AdminComponent,
    NoteComponent,
    SplashComponent,
    CreateNoteComponent,
    NoteFormComponent,
    UpdateNoteComponent,
    DeleteNoteComponent,
    SubmittingComponent,
    CommentsComponent,
    CommentsFormComponent
  ],
  
  providers: [
    AuthenticationService,
    Title,
    ApiService,
    UtilsService,
    DatePipe,
    FilterSortService,
    AuthGuard,
    AdminGuard,
    NoteFormService

    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }