import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private checkToken: BehaviorSubject<any>;
  public checkUser: Observable<any>;

  constructor(private http: HttpClient) { 
    this.checkToken = new BehaviorSubject<any>(localStorage.getItem("id_token"));
    this.checkUser = this.checkToken.asObservable();
  }

  sendToServer(user: any)
  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:8080/login', JSON.stringify(user),
    {
      headers: headers
    }).pipe(map(data => {
      if(data.idToken)
      {
        localStorage.setItem("id_token", data.idToken);
        this.checkToken.next(data.idToken);
      }

      else
      {
        window.alert("Incorrect username or password");
      }
    }));
  }

  public get currentUser()
  {
    return this.checkToken.value;
  }

  logout()
  {
    localStorage.removeItem("id_token");
    this.checkToken.next(null);
    window.location.reload();
  }
}
