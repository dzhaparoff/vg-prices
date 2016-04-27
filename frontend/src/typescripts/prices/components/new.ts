import { Component }         from 'angular2/core';
import { NgForm }            from 'angular2/common';
import { ROUTER_DIRECTIVES, Router, OnActivate, ComponentInstruction } from 'angular2/router';

import { Price }             from './../models/Price'
import { PriceService }      from './../services/price.service'

import { ComponentController }  from './../../main/component.controller';
import { LoadingService }       from './../../main/services/loading.service'

@Component({
  selector:    'app-price-new',
  templateUrl: '/ng/templates/prices/new.tmpl.html',
  directives: [ ROUTER_DIRECTIVES ]
})

export class PriceNewComponent extends ComponentController implements OnActivate {

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

  routerOnActivate(to: ComponentInstruction, from: ComponentInstruction) {

  }

  create_price() {
    this._priceService.create(this.price).subscribe(
        price => {
          this.price = <Price>price;
          this._router.navigate(['PricesList'])
        },
        error => this.errorMessage = <any>error);
  }

}