import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent},
    { path: 'home', component: HomeComponent},
    { path: 'profile', component: ProfileComponent},
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
