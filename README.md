# Currency Converter
Currency Converter App based on angular 6 with Material Bootstrap.
![alt text](img/usdToInr.jpg)![alt text](img/wrong.jpg)
![alt text](img/copy.jpg)![alt text](img/usdToInrResult.jpg)
![alt text](img/allConversions.jpg)![alt text](img/allConversion2.jpg)


## Demo
You may want to have a look at the demo: https://vgupta1192.github.io/currency-demo/

## Adding the component in your project
```
<app-currency-converter></app-currency-converter>
```
### Dependencies
```
npm install --save angular-bootstrap-md font-awesome hammerjs chart.js@2.5.0
```

### App Details
```
App can be used to convert different currencies like dollar to Indian Rupees and Indian Rupees to European Pound and a few other currencies etc. in a web application.
User also has the option to directly copy the converted currency into the clipboard.
```

### Services
```
The service call for getting the current currency rate for different currencies.

1. currency.service.ts
```
### currency.service.ts
``` typescript
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

```
### Model
```

1. currency.model.ts
```
### currency.model.ts
``` typescript
export interface Currency {
    USD_INR: {val};
    INR_USD: {val};
    JPY_INR: {val};
    INR_JPY: {val};
    EUR_INR: {val};
    INR_EUR: {val};
}

```
### currency-converter.component.html
``` html
<div class="container">
  <div class="row">
    <div class="col- mx-auto">
      <mdb-card class="text-center">
        <mdb-card-header class="indigo text-white">Currency Converter</mdb-card-header>
        <mdb-card-body style="background-color:#fafafa">
          <mdb-card-title>
            <div class="dropdown" mdbDropdown>
              <button mdbDropdownToggle mdbBtn color="primary" class="dropdown-toggle waves-light" type="button"
                mdbWavesEffect>
               {{dropdownName}}
              </button>
              <div class="dropdown-menu dropdown-primary">
                <button class="dropdown-item" *ngFor="let conversion of conversions" (click)="conversionChange(conversion.id,conversion.name)">{{conversion.name}}</button>
              </div>
            </div>
          </mdb-card-title>
          <mdb-card-text>
            <form class="text-center border border-light p-5" #conversionForm="ngForm">

              <div *ngIf="usdToInrSelect">
                <i class="fa fa-dollar w-25 p-3" aria-hidden="true"></i><i class="fa fa-arrow-right w-25 p-3"
                  aria-hidden="true"></i><i class="fa fa-rupee w-25 p-3" aria-hidden="true"></i>
                <div class="md-form wow fadeInUp" *ngIf="showConfirm">
                  <input mdbInputDirective type="number" id="Usd" [(ngModel)]="amount" name="currencyUSDTo" placeholder="USD To INR"
                    required >
                  <button mdbBtn type="button" color="info" block="true" outline="true" (click)="convertCurrency()"
                    [disabled]="!conversionForm.valid" mdbWavesEffect>Convert</button>
                </div>
                <div class="md-form wow fadeInUp" data-wow-delay="0.6s" *ngIf="!showConfirm">
                    <button class="btn-copy-code btn btn-outline-grey btn-sm px-2 waves-effect" (click)="copyMessage()">
                      <i class="fa fa-copy mr-1" *ngIf="copyLabel === 'Copy Amount'"></i> {{copyLabel}}
                    </button>
                  <mdb-card-text>{{convertedAmount | currency:'INR'}}</mdb-card-text>
                  <button mdbBtn type="button" color="info" block="true" outline="true" (click)="showConfirm=!showConfirm"
                    mdbWavesEffect>Back</button>
                </div>
              </div>

              <div *ngIf="inrToUsdSelect">
                <i class="fa fa-rupee w-25 p-3" aria-hidden="true"></i><i class="fa fa-arrow-right w-25 p-3"
                  aria-hidden="true"></i><i class="fa fa-dollar w-25 p-3" aria-hidden="true"></i>
                <div class="md-form wow fadeInUp" *ngIf="showConfirm">
                  <input mdbInputDirective type="number" id="Inr" [(ngModel)]="amount" name="currencyINR" placeholder="INR To USD"
                    required >
                  <button mdbBtn type="button" color="info" block="true" outline="true" (click)="convertCurrency()"
                    [disabled]="!conversionForm.valid" mdbWavesEffect>Convert</button>
                </div>
                <div class="md-form wow fadeInUp" data-wow-delay="0.6s" *ngIf="!showConfirm">
                    <button class="btn-copy-code btn btn-outline-grey btn-sm px-2 waves-effect" (click)="copyMessage()">
                        <i class="fa fa-copy mr-1" *ngIf="copyLabel === 'Copy Amount'"></i> {{copyLabel}}
                      </button>
                  <mdb-card-text>{{convertedAmount | currency:'USD'}}</mdb-card-text>
                  <button mdbBtn type="button" color="info" block="true" outline="true" (click)="showConfirm=!showConfirm"
                    mdbWavesEffect>Back</button>
                </div>
              </div>

              <div *ngIf="jpyToInrSelect">
                <i class="fa fa-yen w-25 p-3" aria-hidden="true"></i><i class="fa fa-arrow-right w-25 p-3" aria-hidden="true"></i><i
                  class="fa fa-rupee w-25 p-3" aria-hidden="true"></i>
                <div class="md-form wow fadeInUp" *ngIf="showConfirm">
                  <input mdbInputDirective type="number" id="Inr" [(ngModel)]="amount" name="currencyCADToINR" required
                    placeholder="JPY To INR" >
                  <button mdbBtn type="button" color="info" block="true" outline="true" (click)="convertCurrency()"
                    [disabled]="!conversionForm.valid" mdbWavesEffect>Convert</button>
                </div>
                <div class="md-form wow fadeInUp" data-wow-delay="0.6s" *ngIf="!showConfirm">
                    <button class="btn-copy-code btn btn-outline-grey btn-sm px-2 waves-effect" (click)="copyMessage()">
                        <i class="fa fa-copy mr-1" *ngIf="copyLabel === 'Copy Amount'"></i> {{copyLabel}}
                      </button>
                  <mdb-card-text>{{convertedAmount | currency:'INR'}}</mdb-card-text>
                  <button mdbBtn type="button" color="info" block="true" outline="true" (click)="showConfirm=!showConfirm"
                    mdbWavesEffect>Back</button>
                </div>
              </div>

              <div *ngIf="inrToJpySelect">
                <i class="fa fa-rupee w-25 p-3" aria-hidden="true"></i><i class="fa fa-arrow-right w-25 p-3"
                  aria-hidden="true"></i><i class="fa fa-yen w-25 p-3" aria-hidden="true"></i>
                <div class="md-form wow fadeInUp" *ngIf="showConfirm">
                  <input mdbInputDirective type="number" id="Inr" [(ngModel)]="amount" name="currencyINRToCAD" required
                    placeholder="INR To JPY" >
                  <button mdbBtn type="button" color="info" block="true" outline="true" (click)="convertCurrency()"
                    [disabled]="!conversionForm.valid" mdbWavesEffect>Convert</button>
                </div>
                <div class="md-form wow fadeInUp" data-wow-delay="0.6s" *ngIf="!showConfirm">
                    <button class="btn-copy-code btn btn-outline-grey btn-sm px-2 waves-effect" (click)="copyMessage()">
                        <i class="fa fa-copy mr-1" *ngIf="copyLabel === 'Copy Amount'"></i> {{copyLabel}}
                      </button>
                  <mdb-card-text>{{convertedAmount | currency:'JPY'}}</mdb-card-text>
                  <button mdbBtn type="button" color="info" block="true" outline="true" (click)="showConfirm=!showConfirm"
                    mdbWavesEffect>Back</button>
                </div>
              </div>

              <div *ngIf="eurToInrSelect">
                <i class="fa fa-euro w-25 p-3" aria-hidden="true"></i><i class="fa fa-arrow-right w-25 p-3" aria-hidden="true"></i><i
                  class="fa fa-rupee w-25 p-3" aria-hidden="true"></i>
                <div class="md-form wow fadeInUp" *ngIf="showConfirm">
                  <input mdbInputDirective type="number" id="Inr" [(ngModel)]="amount" name="currencyEURToINR" required
                    placeholder="EUR To INR" >
                  <button mdbBtn type="button" color="info" block="true" outline="true" (click)="convertCurrency()"
                    [disabled]="!conversionForm.valid" mdbWavesEffect>Convert</button>
                </div>
                <div class="md-form wow fadeInUp" data-wow-delay="0.6s" *ngIf="!showConfirm">
                    <button class="btn-copy-code btn btn-outline-grey btn-sm px-2 waves-effect" (click)="copyMessage()">
                        <i class="fa fa-copy mr-1" *ngIf="copyLabel === 'Copy Amount'"></i> {{copyLabel}}
                      </button>
                  <mdb-card-text>{{convertedAmount | currency:'INR'}}</mdb-card-text>
                  <button mdbBtn type="button" color="info" block="true" outline="true" (click)="showConfirm=!showConfirm"
                    mdbWavesEffect>Back</button>
                </div>
              </div>

              <div *ngIf="inrToEurSelect">
                <i class="fa fa-rupee w-25 p-3" aria-hidden="true"></i><i class="fa fa-arrow-right w-25 p-3"
                  aria-hidden="true"></i><i class="fa fa-euro w-25 p-3" aria-hidden="true"></i>
                <div class="md-form wow fadeInUp" *ngIf="showConfirm">
                  <input mdbInputDirective type="number" id="Inr" [(ngModel)]="amount" name="currencyINRToEUR" required
                    placeholder="INR To EUR" >
                  <button mdbBtn type="button" color="info" block="true" outline="true" (click)="convertCurrency()"
                    [disabled]="!conversionForm.valid" mdbWavesEffect>Convert</button>
                </div>
                <div class="md-form wow fadeInUp" data-wow-delay="0.6s" *ngIf="!showConfirm">
                    <button class="btn-copy-code btn btn-outline-grey btn-sm px-2 waves-effect" (click)="copyMessage()">
                        <i class="fa fa-copy mr-1" *ngIf="copyLabel === 'Copy Amount'"></i> {{copyLabel}}
                      </button>
                  <mdb-card-text>{{convertedAmount | currency:'EUR'}}</mdb-card-text>
                  <button mdbBtn type="button" color="info" block="true" outline="true" (click)="showConfirm=!showConfirm"
                    mdbWavesEffect>Back</button>
                </div>
              </div>

            </form>
          </mdb-card-text>
        </mdb-card-body>
        <mdb-card-footer class="blue-grey text-white">Exchange Rates updated every 30 minutes</mdb-card-footer>
      </mdb-card>
    </div>
  </div>
</div>

```
### currency-converter.component.ts
``` typescript
import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './currency.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
  amount: any;
  convertedAmount: number;
  copyLabel: string;
  index: number;
  dropdownName: string;
  showConfirm: boolean;
  usdToInrSelect: boolean;
  inrToUsdSelect: boolean;
  jpyToInrSelect: boolean;
  inrToJpySelect: boolean;
  eurToInrSelect: boolean;
  inrToEurSelect: boolean;
  conversions = [
    {
      id: 1,
      name: 'USD TO INR'
    },
    {
      id: 2,
      name: 'INR TO USD'
    },
    {
      id: 3,
      name: 'JPY TO INR'
    },
    {
      id: 4,
      name: 'INR TO JPY'
    },
    {
      id: 5,
      name: 'EUR TO INR'
    },
    {
      id: 6,
      name: 'INR TO EUR'
    }
  ];

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.showConfirm = true;
    this.index = 1;
	this.dropdownName = 'USD To INR';
    this.copyLabel = 'Copy Amount';
    this.usdToInrSelect = true;
    this.inrToUsdSelect = false;
    this.jpyToInrSelect = false;
    this.inrToJpySelect = false;
    this.eurToInrSelect = false;
    this.inrToEurSelect = false;
  }

  conversionChange(id: number, conversionName: string) {
    this.dropdownName = conversionName;
    if (id === 1) {
      this.resetConversion(id);
      this.usdToInrSelect = true;
      this.inrToUsdSelect = false;
      this.jpyToInrSelect = false;
      this.inrToJpySelect = false;
      this.eurToInrSelect = false;
      this.inrToEurSelect = false;
    } else if (id === 2) {
      this.resetConversion(id);
      this.usdToInrSelect = false;
      this.inrToUsdSelect = true;
      this.jpyToInrSelect = false;
      this.inrToJpySelect = false;
      this.eurToInrSelect = false;
      this.inrToEurSelect = false;
    } else if (id === 3) {
      this.resetConversion(id);
      this.usdToInrSelect = false;
      this.inrToUsdSelect = false;
      this.jpyToInrSelect = true;
      this.inrToJpySelect = false;
      this.eurToInrSelect = false;
      this.inrToEurSelect = false;
    } else if (id === 4) {
      this.resetConversion(id);
      this.usdToInrSelect = false;
      this.inrToUsdSelect = false;
      this.jpyToInrSelect = false;
      this.inrToJpySelect = true;
      this.eurToInrSelect = false;
      this.inrToEurSelect = false;
    } else if (id === 5) {
      this.resetConversion(id);
      this.usdToInrSelect = false;
      this.inrToUsdSelect = false;
      this.jpyToInrSelect = false;
      this.inrToJpySelect = false;
      this.eurToInrSelect = true;
      this.inrToEurSelect = false;
    } else {
      this.resetConversion(id);
      this.usdToInrSelect = false;
      this.inrToUsdSelect = false;
      this.jpyToInrSelect = false;
      this.inrToJpySelect = false;
      this.eurToInrSelect = false;
      this.inrToEurSelect = true;
    }
  }

  convertCurrency() {
    this.copyLabel = 'Copy Amount';
    if (this.index === 1) {
      this.currencyService.getCurrency('usd_inr').subscribe(response => {
        this.convertedCurrency(response.USD_INR.val);
      });
    } else if (this.index === 2) {
      this.currencyService.getCurrency('inr_usd').subscribe(response => {
        this.convertedCurrency(response.INR_USD.val);
      });
    } else if (this.index === 3) {
      this.currencyService.getCurrency('jpy_inr').subscribe(response => {
        this.convertedCurrency(response.JPY_INR.val);
      });
    } else if (this.index === 4) {
      this.currencyService.getCurrency('inr_jpy').subscribe(response => {
        this.convertedCurrency(response.INR_JPY.val);
      });
    } else if (this.index === 5) {
      this.currencyService.getCurrency('eur_inr').subscribe(response => {
        this.convertedCurrency(response.EUR_INR.val);
      });
    } else {
      this.currencyService.getCurrency('inr_eur').subscribe(response => {
        this.convertedCurrency(response.INR_EUR.val);
      });
    }
  }

  convertedCurrency(response: any) {
    this.convertedAmount = this.amount * response;
    this.showConfirm = false;
  }

  resetConversion(id: number) {
    this.index = id;
    this.showConfirm = true;
    this.amount = '';
    this.copyLabel = 'Copy Amount';
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  copyMessage() {
    this.copyLabel = 'Copied!';
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.convertedAmount.toFixed(2);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}

```

### currency-converter.component.scss
``` 
.dropdown .dropdown-menu {
    left: 64px !important;
}
.dropdown .dropdown-menu .dropdown-item {
    margin-left: 13px !important;
}

.dropdown .dropdown-menu .dropdown-item:hover {
    width:85%;
}

.text-white {
    color: #fff;
}

```

### app.module.ts
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyConverterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
