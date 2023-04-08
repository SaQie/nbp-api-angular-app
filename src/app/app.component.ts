import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './services/currency.service';
import { Currency, CurrencyTableInfo } from './models/currency';
import { MatTableDataSource } from '@angular/material/table';
import { CurrencyConverterService } from './services/currency-converter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  currencyToCompare!: Currency;
  selectedRow!: number;

  displayedColumns: String[] = [
    'id',
    'currency',
    'code',
    'bid',
    'ask',
    'actions'
  ]

  dataSource!: MatTableDataSource<Currency>;
  
  constructor(private _currencyService: CurrencyService, private _converterService: CurrencyConverterService){}

  ngOnInit(): void {
    this._currencyService.getCurrencyTable().subscribe(data => {
      this.dataSource = new MatTableDataSource(data.rates);
    })
  } 

  onRowClick(clickedElement: Currency): void {
      this._converterService.setCurrencyToConverter(clickedElement);
      this.selectedRow = this.dataSource.data.indexOf(clickedElement);
  }

}



