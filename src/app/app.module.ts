import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//routing
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NoteSearchComponent } from './note-search/note-search.component';
import { MessagesComponent } from './messages/messages.component';
import { NoteAddComponent } from './note-add/note-add.component';
//import { AlertComponent } from './alert/alert.component';
//import { LoginComponent } from './login/login.component';
//import { RegisterComponent } from './register/register.component'

//services and helpers
import { NoteService } from './note.service';
import { MessageService } from './message.service';
//import { AuthGuard } from './auth-guard';
import { JwtInterceptor } from './jwt-interceptor';
//import { AlertService } from './alert.service';
import { UserService } from './user.service';
import { AuthenticationService } from './auth/authentication.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { ApiService } from './core/api.service';
import { UtilsService } from './core/utils.service';
import { FilterSortService } from './core/filter-sort.service';
import { DatePipe } from '@angular/common';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    NoteDetailComponent,
    MessagesComponent,
    NoteSearchComponent,
    NoteAddComponent,
    //AlertComponent,
    //LoginComponent,
    //RegisterComponent,
    HeaderComponent,
    FooterComponent,
    CallbackComponent
  ],
  providers: [
    NoteService,
    MessageService,
    //AuthGuard,
    //AlertService,
    AuthenticationService,
    Title,
    UserService,
    //{
      //provide: HTTP_INTERCEPTORS,
      //useClass: JwtInterceptor,
      //multi: true
    //},
    ApiService,
    UtilsService,
    DatePipe,
    FilterSortService

    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }