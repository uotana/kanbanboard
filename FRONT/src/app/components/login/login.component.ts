import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  loginForm: FormGroup = new FormGroup({
    user: new FormControl(null),
    password: new FormControl(null)
  });

  ngOnInit(): void {}

  login(){
    console.log('login - LOGIN');
  }

}
