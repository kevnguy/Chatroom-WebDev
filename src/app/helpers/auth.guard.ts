import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}
  canActivate()
  {
    let loggedIn = this.loginService.currentUser;

    if(loggedIn)
    {
      return true;
    }

    else
    {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
