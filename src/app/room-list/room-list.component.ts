import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  chatrooms: any;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.retrieveRooms();
  }

  async retrieveRooms()
  {
    this.chatrooms = await this.http.get<any>('http://localhost:8080/').toPromise();
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
