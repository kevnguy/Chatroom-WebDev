import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginService} from './login.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = this.loginService.currentUser;
    
    if(currentUser)
    {
      request = request.clone({
        headers: request.headers.append('Authorization', `${currentUser}`)
      });
    }

    return next.handle(request);
  }
}
