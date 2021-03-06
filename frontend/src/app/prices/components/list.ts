import { Component }            from '@angular/core';
import { ROUTER_DIRECTIVES }    from '@angular/router';

import { FormattedDatePipe }    from './../../pipes/formatted_date.pipe';

import { ComponentController }  from './../../main/component.controller';
import { LoadingService }       from './../../main/services/loading.service'

import { Price }                from './../models/Price'
import { PriceService }         from './../services/price.service'

//noinspection TypeScriptCheckImport
import _ from 'lodash'

@Component({
  selector:    'app-price-list',
  templateUrl: '/ng/templates/prices/list.tmpl.html',
  directives: [ ROUTER_DIRECTIVES ],
  pipes: [ FormattedDatePipe ]
})

export class PriceListComponent extends ComponentController{

  collection: string = 'prices';
  prices: Price[];
  errorMessage: any;
  selected_prices: Price[] = [];

  constructor(
      private _priceService: PriceService,
      private _loading: LoadingService
  ) {
    super(_loading);

  }

  ngOnInit() {
    this.getPrices();
  }

  getPrices() {
    this._priceService.query().subscribe(
        prices => { this.prices = prices; },
        error  => this.errorMessage = <any>error);
  }

  deletePrice(price: Price) {
    this._priceService.destroy(price).subscribe(
        p => { this.prices = this.prices.filter(o => o.id.$oid !== price.id.$oid) },
        error => this.errorMessage = <any>error);
  }

  exportOffers() {
    const ids = _.map(this.selected_prices, (item) => item.id.$oid);
    this._priceService.collection_action('export_offers', {ids: ids}).subscribe(
        res => {

        },
        error => this.errorMessage = <any>error
    )
  }

  priceSelected(price: Price) {
    return _.includes(this.selected_prices, price)
  }

  priceSelect(price: Price) {
    if(_.includes(this.selected_prices, price))
      _.pull(this.selected_prices, price);
    else
      this.selected_prices.push(price);
  }

  exportAvailable(){
    return this.selected_prices.length > 0
  }
}