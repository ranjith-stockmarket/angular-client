import { Component, OnInit } from '@angular/core';
import * as xlsx  from 'xlsx';

export interface StockPrice{
  CompanyCode : number
  StockExchange : string
  Timestamp : Date
  PricePerShare : number
}

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  file: File | undefined
  arrayBuffer:any
  res:any = []
  list:any
  displayedColumns: string[] = ['CompanyCode', 'StockExchange', 'Date', 'Time', 'PricePerShare'];

  constructor() { }

  ngOnInit(): void {
  }

  viewFile(event : Event) {
    // @ts-ignore
    this.file = event.target.files[0];
    let fileReader = new FileReader();
    // @ts-ignore
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = [];
      for (let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      const bstr = arr.join("");
      const workbook = xlsx.read(bstr, {type: "binary"});
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      let arraylist:any[] = xlsx.utils.sheet_to_json(worksheet, {raw: false});
      arraylist = arraylist.filter(entry => {
        if(entry.CompanyCode==undefined || entry.StockExchange==undefined ||
            entry.Time==undefined || entry.Date==undefined || entry.PricePerShare==undefined){
          return false;
        }
        return true;
      }).map(entry => {
        entry.CompanyCode = parseInt(entry.CompanyCode.trim());
        entry.PricePerShare = parseFloat(entry.PricePerShare.trim());
        entry.Timestamp = new Date(entry.Date.trim()+" "+entry.Time.trim());
        delete entry.Time;
        delete entry.Date;
        entry.StockExchange = entry.StockExchange.trim();
        return <StockPrice>entry;
      })
      this.list = arraylist
      let json : any = {};
      for(let i = 0; i!=arraylist.length; ++i){
        let companyCode = arraylist[i].CompanyCode
        let stockExchange = arraylist[i].StockExchange
        let timestamp = arraylist[i].Timestamp
        let price = arraylist[i].PricePerShare
        if(!json.hasOwnProperty(companyCode)){
          let entry : any = {}
          entry[stockExchange] = [{
            'Timestamp' : timestamp,
            'PricePerShare' : price
          }]
          json[companyCode] = entry
        }
        else if(!json[companyCode].hasOwnProperty(stockExchange)){
          let entry : any = []
          entry = [{
            'Timestamp' : timestamp,
            'PricePerShare' : price
          }]
          json[companyCode][stockExchange] = entry
        }
        else{
          json[companyCode][stockExchange].push({
            'Timestamp' : timestamp,
            'PricePerShare' : price
          })
        }
      }

      for(let i in json){
        let stockExchanges = []
        for(let j in json[i]){
          stockExchanges.push({
            name : j,
            stock_prices : json[i][j]
          })
        }
        this.res.push({
          company : i,
          stock_exchanges : stockExchanges
        })
      }
    }
  }
}
