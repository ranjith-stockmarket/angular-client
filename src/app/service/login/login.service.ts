import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Config } from "../../Config";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(data:any){
    return this.httpClient
      .post(Config.LOGIN_ENDPOINT,data)
  }
}
