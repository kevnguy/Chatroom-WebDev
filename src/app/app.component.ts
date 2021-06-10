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
  profileVar: any;
  profileID: any;

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {}

  async ngOnInit()
  {
    let user = this.loginService.currentUser;

    if(user)
    {
      this.isLoggedIn = true;
      this.profileVar = await this.http.get<any>('http://localhost:8080/user').toPromise();
      this.profileID = this.profileVar._id;
      console.log(this.profileVar);
    }

    else
    {
      this.isLoggedIn = false;
    }
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
