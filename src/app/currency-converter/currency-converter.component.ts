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
  conversions = [
    {
      id: 1,
      name: 'USD'
    },
    {
      id: 2,
      name: 'INR'
    },
    {
      id: 3,
      name: 'JPY'
    },
    {
      id: 4,
      name: 'EUR'
    },
    {
      id: 5,
      name: 'CAD'
    },
    {
      id: 6,
      name: 'KRW'
    }
  ];
  fromDropdownName: string;
  toDropdownName: string;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.showConfirm = true;
    this.index = 1;
    this.fromDropdownName = 'USD';
    this.toDropdownName = 'INR';
    this.copyLabel = 'Copy Amount';
  }

  conversionFromChange(id: number, conversionName: string) {
    this.resetConversion();
    this.fromDropdownName = conversionName;
  }

  conversionToChange(id: number, conversionName: string) {
    this.resetConversion();
    this.toDropdownName = conversionName;
  }

  convertCurrency() {
    this.copyLabel = 'Copy Amount';
    this.currencyService.getCurrency(this.fromDropdownName, this.toDropdownName).subscribe(response => {
      if (this.toDropdownName === 'USD') {
        this.convertedCurrency(response.rates.USD);
      } else if (this.toDropdownName === 'INR') {
        this.convertedCurrency(response.rates.INR);
      } else if (this.toDropdownName === 'EUR') {
        this.convertedCurrency(response.rates.EUR);
      } else if (this.toDropdownName === 'JPY') {
        this.convertedCurrency(response.rates.JPY);
      } else if (this.toDropdownName === 'CAD') {
        this.convertedCurrency(response.rates.CAD);
      } else {
        this.convertedCurrency(response.rates.KRW);
      }
    });
  }

  convertedCurrency(response: any) {
    if (response === undefined) {
      response = 1;
    }
    this.convertedAmount = this.amount * response;
    this.showConfirm = false;
  }

  resetConversion() {
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
