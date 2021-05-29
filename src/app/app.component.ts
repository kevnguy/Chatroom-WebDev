import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatroom';
  chatrooms: any;
  isHome!: boolean;

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit()
  {
    this.retrieveRooms();
  }

  async retrieveRooms()
  {
    this.chatrooms = await this.http.get<any>('http://localhost:8080/').toPromise();
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

  async createRoom()
  {
    let roomName = window.prompt("Enter room name.");
    let room = {
      roomName: roomName
    }

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let success = await this.http.post<boolean>('http://localhost:8080/create', JSON.stringify(room),
    {
      headers: headers
    }).toPromise();

    if(success)
    {
      this.retrieveRooms();
    }
  }
}
