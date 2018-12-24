import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Currency } from './currency.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CurrencyService {
    constructor(private httpClient: HttpClient) {}
    getCurrency(fromCurrency: string, toCurrency: string): Observable<Currency> {
        return this.httpClient.get<Currency>('https://ratesapi.io/api/latest?base=' + fromCurrency + '&symbols=' + toCurrency);
    }
}
