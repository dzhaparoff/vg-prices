import { Component }                 from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { Price }                     from './../models/Price'
import { PriceService }              from './../services/price.service'

import { ComponentController }       from './../../main/component.controller';
import { LoadingService }            from './../../main/services/loading.service'

@Component({
  selector:    'app-price-new',
  templateUrl: '/ng/templates/prices/new.tmpl.html',
  directives: [ ROUTER_DIRECTIVES ]
})

export class PriceNewComponent extends ComponentController {

  collection: string = 'prices';
  price: Price;
  errorMessage: any;

  constructor(
      private _router: Router,
      private _priceService: PriceService,
      private _loading: LoadingService
  ) {
    super(_loading);
    this.price = new Price
  }

  create_price() {
    this._priceService.create(this.price).subscribe(
        price => {
          this.price = <Price>price;
          this._router.navigate(['/prices'])
        },
        error => this.errorMessage = <any>error);
  }

}