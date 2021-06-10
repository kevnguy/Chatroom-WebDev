import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './room/room.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './helpers/auth.guard';
import {LoginGuard} from './helpers/login.guard';
import {RoomListComponent} from './room-list/room-list.component';
import {ProfileComponent} from './profile/profile.component';


const routes: Routes = [
  {path: 'room/:_id', component: RoomComponent, canActivate: [AuthGuard]},
  {path: 'sign-up', component: SignUpComponent, canActivate: [LoginGuard]},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'room-list', component: RoomListComponent, canActivate: [AuthGuard]},
  {path: 'user/:_id', component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
