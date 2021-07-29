import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Config} from "../../Config";

@Injectable({
  providedIn: 'root'
})
export class StockexchangeService {

  constructor(private httpClient:HttpClient) { }

  getAll() {
    return this.httpClient.get(Config.STOCKEXCHANGE_ENDPOINT+"/getAll")
  }

  addStockExchange(value: any) {
    return this.httpClient.post(Config.STOCKEXCHANGE_ENDPOINT+"/add",value)
  }
}
