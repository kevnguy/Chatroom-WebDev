import { Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  chatMessage = this.formBuilder.group({
    message: ''
  });
  roomId!: string | null;
  user!: string | null;
  messages: any;

  searchValue = this.formBuilder.group({
    search: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //this.user = window.prompt("Enter username");
    this.roomId = this.route.snapshot.paramMap.get('_id');
    this.retrieveMessages();
    //let interval = setInterval(this.retrieveMessages.bind(this), 1000);
  }

  async retrieveMessages()
  {
    this.messages = await this.http.get<any>('http://localhost:8080/messages/' + this.roomId).toPromise();
  }

  async onSubmit()
  {
    let messageDetails = {
      //user: this.user,
      message: this.chatMessage.value.message,
      roomId: this.roomId,
      created_at:  moment().format('MMM D h:mm a'),
    }
    //console.log(messageDetails);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let check = await this.http.post<boolean>('http://localhost:8080/insert', JSON.stringify(messageDetails),
    {
      headers: headers
    }).toPromise();

    if(check)
    {
      this.retrieveMessages(); 
    }
  }

  filterMessages()
  {
    if(this.searchValue.value.search)
    {
      let valueToSearch = this.searchValue.value.search.toLowerCase();
      let sortedMessages = this.messages.filter((entry: any) =>
        entry.message.toLowerCase().includes(valueToSearch)
      );

      this.messages = sortedMessages;
    }

    else
    {
      this.retrieveMessages();
    }
  }

 async delete(event: any){
    let messageID = {
      body:{
        id: event.target.value
      }
    }

    let check = await this.http.request<boolean>('delete', 'http://localhost:8080/delete', messageID).toPromise();

    if(check)
    {
      this.retrieveMessages();
    }
    else {
      alert("You can't delete the messages of others!");
    }
  }


  async edit(event: any)
  {
    let newMessage = window.prompt("Edit your message");
    let message = {
      message: newMessage,
      id: event.target.value
    }

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    let check = await this.http.put<boolean>('http://localhost:8080/messages', JSON.stringify(message), {
      headers: headers
    }).toPromise();

    if(check)
    {
      this.retrieveMessages();
    }

    else
    {
      window.alert("Cannot edit this message");
    }
  }
}
