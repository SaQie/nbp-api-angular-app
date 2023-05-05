import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency, CurrencyTable, CurrencyTableInfo } from '../models/currency';
import { environment } from 'src/environments/environment.development';
import { Observable, catchError, delay, map, throwError } from 'rxjs';
import { DateRange } from '../models/dateRange';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private _httpClient: HttpClient) {

  }


  getCurrencyTable(): Observable<CurrencyTableInfo> {
    return this._httpClient.get<CurrencyTable>(`${environment.API_URL}`)
      .pipe(
        delay(1000),
        map((data) => data.at(0) as CurrencyTableInfo)
      )
  }

  getCurrencyHistoryTable(currencyCode: String, dateRange: DateRange): Observable<CurrencyTableInfo>{
    let dateFromString = dateRange.dateFrom.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');
    console.log(dateFromString);
    let dateToString = dateRange.dateTo.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');
    console.log(dateToString);

    console.log(`http://api.nbp.pl/api/exchangerates/rates/C/${currencyCode}/${dateFromString}/${dateToString}/?format=json`);

    return this._httpClient.get<CurrencyTableInfo>(`http://api.nbp.pl/api/exchangerates/rates/C/${currencyCode}/${dateFromString}/${dateToString}/?format=json`)
  }

}
