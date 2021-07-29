import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {MatChipInputEvent} from "@angular/material/chips";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-ipo',
  templateUrl: './ipo.component.html',
  styleUrls: ['./ipo.component.scss']
})
export class IpoComponent implements OnInit {

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  stockExchangeCtrl = new FormControl();
  filteredStockExchanges: Observable<string[]>;
  stockExchanges: string[] = [];
  allStockExchanges: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('stockExchangeInput') stockExchangeInput: ElementRef<HTMLInputElement> | undefined;

  constructor() {
    this.filteredStockExchanges = this.stockExchangeCtrl.valueChanges.pipe(
      startWith(null),
      map((stockExchange: string | null) =>  this._filter(stockExchange)));// stockExchange ? this._filter(stockExchange) : this.allStockExchanges.slice()));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value && this.allStockExchanges.includes(value) && !this.stockExchanges.includes(value)) {
      this.stockExchanges.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.stockExchangeCtrl.setValue(null);
  }

  remove(stockExchange: string): void {
    const index = this.stockExchanges.indexOf(stockExchange);

    if (index >= 0) {
      this.stockExchanges.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.stockExchanges.push(event.option.viewValue);
    // @ts-ignore
    this.stockExchangeInput.nativeElement.value = '';
    this.stockExchangeCtrl.setValue(null);
  }

  private _filter(value: string | null): string[] {
    let filterValue: string;
    if(value!=null) {
      filterValue = value.trim().toLowerCase();
    }
    if(this.stockExchanges.length==0){
      return this.allStockExchanges.slice();
    }
    return this.allStockExchanges.filter(stockExchange => (stockExchange.toLowerCase().includes(filterValue) || filterValue==null) && !this.stockExchanges.includes(stockExchange));
  }

  ngOnInit(): void {
  }

}
