import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//routing
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { NoteModule } from './pages/note/note.module';
import { AppComponent } from './app.component';
import { SplashComponent } from './pages/splash/splash.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CommentsComponent } from './pages/comments/comments.component';


//services and helpers
import { JwtInterceptor } from './jwt-interceptor';
import { AuthenticationService } from './auth/authentication.service';
import { CallbackComponent } from './pages/callback/callback.component';

import { AuthGuard } from './auth/auth-guard';
import { AdminGuard } from './auth/admin.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { NoteFormService } from './pages/note/note-form/note-form.service';
import { SubmittingComponent } from './core/submitting.component';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoteModule,
    CoreModule.forRoot()
  ],

  declarations: [
    AppComponent,
    DashboardComponent,
    CallbackComponent,
    AdminComponent,
    SplashComponent,
    SubmittingComponent,
  ],
  
  providers: [
    AuthenticationService,
    Title,
    AuthGuard,
    AdminGuard,
    NoteFormService

    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }