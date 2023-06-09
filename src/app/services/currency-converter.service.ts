import { Injectable } from '@angular/core';
import { Subject, Subscription, map, pipe } from 'rxjs';
import { Currency } from '../models/currency';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CurrencyConverterComponent } from '../components/currency-converter/currency-converter.component';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {

  private selectedCurrencyToCompare = new Subject<Currency>();
  private currencyToCompareSubscription!: Subscription;

  constructor(private _snackBar: MatSnackBar, private _dialog: MatDialog) {
    this.subscribeSnackBar();
  }

  private subscribeSnackBar(): void {
    this.currencyToCompareSubscription = this.selectedCurrencyToCompare
      .subscribe(currency => {
        const dialogDataToSend = currency;
        const snackbar = this._snackBar.open(`Wybrana waluta do przeliczenia: [ ${currency.code} ]`, 'Przelicz', {
          verticalPosition: 'bottom',
          duration: 0,
        });
        snackbar.onAction().subscribe(() => {
          const dialog = this._dialog.open(CurrencyConverterComponent, { data: dialogDataToSend });
        });
      })
  };

  setCurrencyToConverter(currency: Currency) {
    this.selectedCurrencyToCompare.next(currency);
  }
}



