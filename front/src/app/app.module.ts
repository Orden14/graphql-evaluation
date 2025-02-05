import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { WcsAngularModule } from 'wcs-angular';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { HeadersComponent } from './components/headers/headers.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { GraphQLModule } from '../graphql/graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { DetailPostComponent } from './components/detail-post/detail-post.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RegisterPageComponent,
    HeadersComponent,
    LoginPageComponent,
    DetailPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WcsAngularModule,
    NgbModule,
    GraphQLModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
