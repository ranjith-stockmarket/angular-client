import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Config} from "../../Config";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpClient:HttpClient) { }

  getAll() {
    return this.httpClient.get(Config.COMPANY_ENDPOINT+"/getAll")
  }

  addCompany(value: any) {
    return this.httpClient.post(Config.COMPANY_ENDPOINT+"/add",value)
  }
}
