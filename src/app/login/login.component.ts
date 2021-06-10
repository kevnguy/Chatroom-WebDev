import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {LoginService} from '../helpers/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = this.formBuilder.group({
    username: '',
    password: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) { }

  onSubmit()
  {
    this.loginService.sendToServer(this.user.value).subscribe({
      next: () => {
        this.router.navigate(['/room-list']);
        window.location.reload();
      }
    });
  }

  ngOnInit(): void {
  }

}
