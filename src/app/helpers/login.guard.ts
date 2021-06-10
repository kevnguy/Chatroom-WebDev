import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor (
    private loginService: LoginService,
    private router: Router
  ) {}

  canActivate()
  {
    let loggedIn = this.loginService.currentUser;
    
    if(!loggedIn)
    {
      return true;
    }

    else
    {
      this.router.navigate(['/room-list']);
      return false;
    }
  }
  
}
