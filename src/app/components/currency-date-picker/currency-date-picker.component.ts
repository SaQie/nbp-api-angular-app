import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Currency } from 'src/app/models/currency';
import { DateRange } from 'src/app/models/dateRange';

@Component({
  selector: 'app-currency-date-picker',
  templateUrl: './currency-date-picker.component.html',
  styleUrls: ['./currency-date-picker.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class CurrencyDatePickerComponent {

  currencyData: Currency;
  dateRange!: DateRange;
  dateRangeForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _dialogData: Currency,
    private _dialog_ref: MatDialogRef<CurrencyDatePickerComponent>,
    private _formBuilder: FormBuilder) {
    this.dateRangeForm = this._formBuilder.group({
      dateFrom: [new Date, Validators.required],
      dateTo: [new Date, Validators.required]
    })
    this.currencyData = _dialogData;
  }

  onShowButtonClick() {
    let dateFrom = this.dateRangeForm.get('dateFrom')?.value as Date;
    let dateTo = this.dateRangeForm.get('dateTo')?.value as Date;

    this.dateRange = {dateFrom: dateFrom, dateTo: dateTo};
    this._dialog_ref.close(this.dateRange)
  }



}
