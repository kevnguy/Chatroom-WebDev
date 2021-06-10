import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfiles:any;

  constructor(
    private http: HttpClient

  ) { }

  ngOnInit(): void {
    this.retrieveUserInfo();
  }

  async retrieveUserInfo()
  {
    this.userProfiles = await this.http.get<any>('http://localhost:8080/user').toPromise();

    console.log(this.userProfiles);
  }
}
