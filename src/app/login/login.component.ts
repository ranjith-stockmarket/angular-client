import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {LoginService} from "../service/login/login.service";
import {AuthService} from "../service/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    username: 'admin',
    password: 'admin'
  });

  constructor(
    private formBuilder:FormBuilder,
    private loginService:LoginService,
    private authService:AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // console.log(this.loginForm.value);
    this.loginService.login(this.loginForm.value)
      .subscribe(response => {
        let res:any = response;
        if(res.hasOwnProperty("jwt")){
          AuthService.setToken(res.jwt)
          this.authService.login(res.username, res.admin);
        }
        else{
          console.error("Error Baby")
        }
      });
    this.loginForm.reset();
  }

}
