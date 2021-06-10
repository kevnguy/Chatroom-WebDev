import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginService} from '../helpers/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  newUser = this.formBuilder.group({
    name: '',
    email: '',
    username: '',
    password: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private loginService: LoginService,
    private router: Router,
  ) { }

  async onSubmit()
  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    let userCheck = await this.http.get<boolean>('http://localhost:8080/api/' + this.newUser.value.username).toPromise();

    if(!userCheck)
    {
      let check = await this.http.post<boolean>('http://localhost:8080/sign-up', JSON.stringify(this.newUser.value), {
        headers: headers
      }).toPromise();

      if(check){
        this.loginService.sendToServer(this.newUser.value).subscribe({
          next: () => {
            this.router.navigate(['/room-list']);
            window.location.reload();
          }
        });
      }
    }

    else
    {
      window.alert("Username already taken!");
    }
  }

  ngOnInit(): void {
  }

}
