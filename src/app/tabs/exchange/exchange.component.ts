import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StockexchangeService} from "../../service/stockexchange/stockexchange.service";

export interface StockExchange {
  id: number
  name: string
  brief: string
  address: string
  remarks: string
}

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {

  stockExchangeForm = this.formBuilder.group({
    name: '',
    brief: '',
    address:'',
    remarks:''
  });

  stockExchangeList: StockExchange[] = [];
  displayedColumns: string[] = ['id','name','brief','address','remarks'];

  constructor(private stockExchangeService:StockexchangeService,
              private formBuilder:FormBuilder,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.stockExchangeService.getAll().subscribe( data => this.stockExchangeList=<StockExchange[]>data);
  }

  onSubmit(): void {
    this.stockExchangeService.addStockExchange(this.stockExchangeForm.value)
      .subscribe(response => {
        let res:any = response;
        if(res.hasOwnProperty("id")){
          this.stockExchangeList.push(res)
          this.snackBar.open("Added Successfully","Close",{
            duration: 2000,
          });
        }
        else{
          this.snackBar.open("Error Occurred","Close",{
            duration: 2000,
          });
        }
      });
    this.stockExchangeForm.reset();
  }

}
