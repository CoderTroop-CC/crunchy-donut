import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//fake backend for testing notes
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

//fake backend for testing login/registration
import { fakeBackendProvider } from './fake-backend';


//routing
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NoteSearchComponent } from './note-search/note-search.component';
import { MessagesComponent } from './messages/messages.component';
import { NoteAddComponent } from './note-add/note-add.component';
import { AlertComponent } from './alert/alert.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'

//services and helpers
import { NoteService } from './note.service';
import { MessageService } from './message.service';
import { AuthGuard } from './auth-guard';
import { JwtInterceptor } from './jwt-interceptor';
import { AlertService } from './alert.service';
import { UserService } from './user.service';
import { AuthenticationService } from './authentication.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    //HttpClientInMemoryWebApiModule.forRoot(
      //InMemoryDataService, { dataEncapsulation: false }
    //)
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    NoteDetailComponent,
    MessagesComponent,
    NoteSearchComponent,
    NoteAddComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    NoteService,
    MessageService,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }