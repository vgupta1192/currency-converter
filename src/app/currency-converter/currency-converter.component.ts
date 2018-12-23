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
    this.copyLabel = 'Copy Amount';
    this.usdToInrSelect = true;
    this.inrToUsdSelect = false;
    this.jpyToInrSelect = false;
    this.inrToJpySelect = false;
    this.eurToInrSelect = false;
    this.inrToEurSelect = false;
  }

  conversionChange(id: number) {
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
