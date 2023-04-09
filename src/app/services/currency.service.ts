import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency, CurrencyTable, CurrencyTableInfo } from '../models/currency';
import { environment } from 'src/environments/environment.development';
import { Observable, delay, map } from 'rxjs';

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

  getCurrencyHistoryTable(): Observable<CurrencyTableInfo>{
    return this._httpClient.get<CurrencyTableInfo>('http://api.nbp.pl/api/exchangerates/rates/C/CZK/2023-01-21/2023-01-31/?format=json');
  }

}
