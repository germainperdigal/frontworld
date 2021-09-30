import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ListComponent} from './components/secured/list/list.component';
import {AccountComponent} from './components/secured/account/account.component';
import {NgModule} from '@angular/core';
import {AuthguardService} from './shared/guard/authguard.service';
import {CreateComponent} from './components/secured/create/create.component';
import {HomeComponent} from './components/home/home.component';
import {PasswordsResolver} from './shared/resolvers/passwords.resolver';
import {AccountResolver} from "./shared/resolvers/account.resolver";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'secured/passwords', component: ListComponent, resolve: { passwords: PasswordsResolver }, canActivate: [AuthguardService] },
  { path: 'secured/passwords/add', component: CreateComponent, canActivate: [AuthguardService] },
  { path: 'secured/account', component: AccountComponent, resolve: { details: AccountResolver }, canActivate: [AuthguardService] },
  { path: 'help', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
