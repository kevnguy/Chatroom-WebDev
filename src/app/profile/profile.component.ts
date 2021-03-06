import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfiles:any;
  _description:any;

  userDesc = this.formBuilder.group({
    description: '',
  });

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.retrieveUserInfo();
    //this.retrieveDescription(); 
  }

  async retrieveUserInfo()
  {
    this.userProfiles = await this.http.get<any>('http://localhost:8080/user').toPromise();
    this.retrieveDescription();
  }

  async retrieveDescription()
  {
    this._description = await this.http.get<any>('http://localhost:8080/user-description/' + this.userProfiles[0]._id).toPromise();
  }

  async onSubmit()
  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    let userDescription = {
      userID: this.userProfiles[0]._id,
      description: this.userDesc.value.description
    }
    //console.log(userDescription);
    if(this._description.length > 0)
    {
      let check = await this.http.put<boolean>('http://localhost:8080/user-description', JSON.stringify(userDescription), {
        headers: headers
      }).toPromise();

      if(check)
      {
        this.retrieveDescription();
      }
    }

    else
    {
      let check = await this.http.post<boolean>('http://localhost:8080/user-description', JSON.stringify(userDescription),
      {headers: headers}).toPromise();

      if(check){
        this.retrieveDescription(); 
      }
    }
  }
}
