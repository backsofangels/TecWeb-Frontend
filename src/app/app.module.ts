import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {ReactiveFormsModule} from '@angular/forms';
import {APIInterceptor, AuthInterceptor} from './HTTPInterceptor';
import {AgmCoreModule} from '@agm/core';
import {ModelComponent} from './model/model.component';
import {ProfileComponent} from './profile/profile.component';

@NgModule({
  declarations: [
      AppComponent,
      HeaderComponent,
      SignupComponent,
      LoginComponent,
      HomeComponent,
      ProfileComponent,
      ModelComponent,
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      ReactiveFormsModule,
      AgmCoreModule.forRoot({
          apiKey: 'AIzaSyB1ReyfWAk7TFdyJmQC2MFvRurLWoHgQCM'
      })
  ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: APIInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
