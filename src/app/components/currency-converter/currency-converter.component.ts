import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  isBuyAction = true;

  constructor(@Inject(MAT_DIALOG_DATA) public _dialogData: Currency, private _formBuilder:FormBuilder, private _currencyService: CurrencyService){
    this.currencyData = this._dialogData;
    this.currencyForm = _formBuilder.group({
      currencySelect: ['', Validators.required],
      value: ['', Validators.required],
      operation: ['Kupić', Validators.required]
    })
    this.addOperationListener();
  }

  ngOnInit(): void {
    this._currencyService.getCurrencyTable().subscribe(data => {
      this.allCurrencies = data.rates;
    })
  }

  calculateCurrencies() {
    if (this.currencyForm.valid){
      this.result = 'Tu bedzie wynik';
    }
  }

  addOperationListener() {
    this.currencyForm.get('operation')?.valueChanges.subscribe(value => {
      value == 'Sprzedać' ? this.isBuyAction = false : this.isBuyAction = true;
    })
  }

}


