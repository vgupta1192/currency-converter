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
        if (currencyRegion === 'usd_inr') {
            return this.httpClient.get<Currency>('https://free.currencyconverterapi.com/api/v5/convert?q=USD_INR&compact=y');
        } else if (currencyRegion === 'inr_usd') {
            return this.httpClient.get<Currency>('https://free.currencyconverterapi.com/api/v5/convert?q=INR_USD&compact=y');
        } else if (currencyRegion === 'jpy_inr') {
            return this.httpClient.get<Currency>('https://free.currencyconverterapi.com/api/v5/convert?q=JPY_INR&compact=y');
        } else if (currencyRegion === 'inr_jpy') {
            return this.httpClient.get<Currency>('https://free.currencyconverterapi.com/api/v5/convert?q=INR_JPY&compact=y');
        } else if (currencyRegion === 'eur_inr') {
            return this.httpClient.get<Currency>('https://free.currencyconverterapi.com/api/v5/convert?q=EUR_INR&compact=y');
        } else if (currencyRegion === 'inr_eur') {
            return this.httpClient.get<Currency>('https://free.currencyconverterapi.com/api/v5/convert?q=INR_EUR&compact=y');
        }
    }
}
