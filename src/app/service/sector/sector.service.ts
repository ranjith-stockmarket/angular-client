import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Config} from "../../Config";

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(private httpClient:HttpClient) { }

  getAll() {
    return this.httpClient.get(Config.SECTOR_ENDPOINT+"/getAll")
  }

  addSector(value: any) {
    return this.httpClient.post(Config.SECTOR_ENDPOINT+"/add",value)
  }
}
