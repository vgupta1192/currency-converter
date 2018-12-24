import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Currency } from './currency.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CurrencyService {
    constructor(private httpClient: HttpClient) {}
    getCurrency(currencyRegion: string): Observable<Currency> {
            return this.httpClient.get<Currency>('https://free.currencyconverterapi.com/api/v5/convert?q=' + currencyRegion + '&compact=y');
    }
}
