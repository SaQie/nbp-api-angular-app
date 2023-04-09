import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { Currency } from 'src/app/models/currency';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit{
  
  currencyForm: FormGroup;
  currencyData: Currency;
  allCurrencies!: Currency[];
  result: string = '';
  dataIsLoading = true;

  isBuyAction = true;

  constructor(@Inject(MAT_DIALOG_DATA) public _dialogData: Currency, private _formBuilder:FormBuilder, private _currencyService: CurrencyService){
    this.currencyData = this._dialogData;
    this.currencyForm = _formBuilder.group({
      value: ['', Validators.required],
      operation: ['Kupić', Validators.required]
    })
    this.addOperationListener();
  }

  ngOnInit(): void {
    this._currencyService.getCurrencyTable()
    .pipe(
      tap(() => this.dataIsLoading = false)
    ).subscribe(data => {
      this.allCurrencies = data.rates;
      this.allCurrencies.push({
        currency: 'Polski złoty',
        code: 'PLN',
        bid: 0,
        ask: 0
      })
    })
  }

  calculateCurrencies() {
    if (this.currencyForm.valid){
      let selectedCurrency = this.currencyForm.get('currencySelect')?.value as Currency;
      let value = this.currencyForm.get('value')?.value as number;
      if (this.isBuyAction){
        let calculatedValue = (value * this.currencyData.ask).toFixed(2);
        this.result = `Aby zakupić ${value} ${this.currencyData.code} potrzebujesz ${calculatedValue} zł`
      }else{
        let calculatedValue = (value * this.currencyData.bid).toFixed(2);
        this.result = `Sprzedając ${value} ${this.currencyData.code} otrzymasz ${calculatedValue} zł`
      }
    }
  }

  addOperationListener() {
    this.currencyForm.get('operation')?.valueChanges.subscribe(value => {
      value == 'Sprzedać' ? this.isBuyAction = false : this.isBuyAction = true;
    })
  }

}


