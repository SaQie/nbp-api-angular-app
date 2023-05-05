import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './services/currency.service';
import { Currency, CurrencyTableInfo } from './models/currency';
import { MatTableDataSource } from '@angular/material/table';
import { CurrencyConverterService } from './services/currency-converter.service';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map, of, pipe, tap, window } from 'rxjs';
import { CurrencyDatePickerComponent } from './components/currency-date-picker/currency-date-picker.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  selectedCurrency!: Currency;
  selectedRow!: number;
  dataIsLoading = true;
  isActualData = true;
  errorMessage!: string;
  errorOccured!: boolean;

  displayedActualDataColumns: String[] = [
    'id',
    'currency',
    'code',
    'bid',
    'ask',
    'actions'
  ]

  displayedHistoricalDataColumns: String[] = [
    'date',
    'currency',
    'code',
    'bid',
    'ask'
  ]

  dataSource!: MatTableDataSource<Currency>;
  historyDataSource!: MatTableDataSource<Currency>;

  constructor(private _currencyService: CurrencyService, private _converterService: CurrencyConverterService, private _dialog: MatDialog) { }

  ngOnInit(): void {
    this._currencyService.getCurrencyTable()
      .pipe(
        tap(() => this.dataIsLoading = false),
        catchError((error: any) => {
          console.error(error);
          this.errorMessage = 'Nie udało się wczytać danych';
          this.errorOccured = true;
          return of(null);
        })
      )
      .subscribe(data => {
        if (data) {
          this.dataSource = new MatTableDataSource(data.rates);
        }
      })
  }

  onRowClick(clickedElement: Currency): void {
    this._converterService.setCurrencyToConverter(clickedElement);
    this.selectedRow = this.dataSource.data.indexOf(clickedElement);
  }

  onHistoryButtonClick(clickedElement: Currency): void {
    const dialogRef = this._dialog.open(CurrencyDatePickerComponent, { data: clickedElement });
    dialogRef.afterClosed().subscribe({
      next: (response) => {
        if (response) {
          this.dataIsLoading = true;
          this._currencyService.getCurrencyHistoryTable(clickedElement.code, response).pipe(
            tap(() => {
              this.dataIsLoading = false;
              this.isActualData = false;
            }),
            catchError((error: any) => {
              console.error(error);
              this.errorMessage = 'Nie udało się wczytać danych';
              this.errorOccured = true;
              return of(null);
            })
          )
            .subscribe(data => {
              if (data) {
                this.selectedCurrency = clickedElement;
                this.historyDataSource = new MatTableDataSource(data.rates);
              }
            })
        }
      }
    })
  }

  backToHomePage(){
    this.errorOccured = false;  
    this.dataIsLoading = false;
  }

}



