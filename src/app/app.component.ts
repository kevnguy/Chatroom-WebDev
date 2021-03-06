import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginService} from './helpers/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatroom';
  chatrooms: any;
  isHome!: boolean;
  isLoggedIn = false;
  profiles: any;

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {}

  ngOnInit()
  {
    let user = this.loginService.currentUser;

    if(user)
    {
      this.isLoggedIn = true;
      this.retrieveUser();
    }

    else
    {
      this.isLoggedIn = false;
    }
  }

  async retrieveUser()
  {
    this.profiles = await this.http.get<any>('http://localhost:8080/user').toPromise();
  }

  linkClicked(event: any)
  {
    if(event.target.value !== "/")
    {
      this.isHome = false;
    }
    
    else
    {
      this.isHome = true;
    }
  }

  

  logout()
  {
    this.loginService.logout();
  }
}
