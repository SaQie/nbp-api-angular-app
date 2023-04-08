import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrencyTable, CurrencyTableInfo } from '../models/currency';
import { environment } from 'src/environments/environment.development';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private _httpClient: HttpClient) {

  }


  getCurrencyTable(): Observable<CurrencyTableInfo> {
    return this._httpClient.get<CurrencyTable>(`${environment.API_URL}`)
      .pipe(
        map((data) => data.at(0) as CurrencyTableInfo)
      )
  }

}
