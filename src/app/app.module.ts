import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//routing
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NoteSearchComponent } from './note-search/note-search.component';
import { MessagesComponent } from './messages/messages.component';
import { NoteAddComponent } from './note-add/note-add.component';

//services and helpers
import { NoteService } from './note.service';
import { MessageService } from './message.service';
import { JwtInterceptor } from './jwt-interceptor';
import { UserService } from './user.service';
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
import { NoteComponent } from './pages/note/note.component';
import { SplashComponent } from './pages/splash/splash.component';
import { CreateNoteComponent } from './pages/create-note/create-note.component';
import { NoteFormComponent } from './pages/note-form/note-form.component';
import { NoteFormService } from './pages/note-form/note-form.service';
import { UpdateNoteComponent } from './pages/update-note/update-note.component';
import { DeleteNoteComponent } from './pages/delete-note/delete-note.component';
import { ShareComponent } from './pages/share/share.component';
import { ShareFormComponent } from './pages/share-form/share-form.component';



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
    NoteSearchComponent,
    NoteAddComponent,
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
    ShareComponent,
    ShareFormComponent
  ],
  
  providers: [
    NoteService,
    MessageService,
    AuthenticationService,
    Title,
    UserService,
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