import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { TodoModule } from './todo/todo.module';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { SessionService } from './service/session.service';

@NgModule({
  declarations: [AppComponent, HomeComponent, SignupComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TodoModule,
    FormsModule,
  ],
  providers: [SessionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
