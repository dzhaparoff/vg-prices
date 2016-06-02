import { Component, Injector }         from '@angular/core';
import { ROUTER_DIRECTIVES, RouteSegment, RouteTree, OnActivate } from '@angular/router';

import { Price, Sheet, PriceConfig, PurchaseMarkup }  from './../../models/Price'
import { PriceService }               from './../../services/price.service'

import { ComponentController }  from './../../../main/component.controller';
import { LoadingService }       from './../../../main/services/loading.service'

//noinspection TypeScriptCheckImport
import _ from "lodash"

interface SheetSimpleConfiguration {
  first_column: number;
  last_column: number;
  columns?: number[];
}

@Component({
  selector:    'app-price-sheets-edit',
  templateUrl: '/ng/templates/sheets/edit.tmpl.html',
  directives: [ ROUTER_DIRECTIVES ],
  pipes: [  ]
})

export class SheetEditComponent extends ComponentController implements OnActivate {
  public collection: string = 'sheets';
  public price_id: string;
  public price: Price;
  public id: string;
  public sheet: Sheet;
  public errorMessage: any;
  public simple_configuration: SheetSimpleConfiguration;
  public data_loaded: boolean = false;
  public currencies: string[];
  public retail_markup: PurchaseMarkup[];

  public configuration_type: string = 'simple';
  public configuration_types: Object[] = [
    {title: 'Простая', type: 'simple'}, {title: 'Сложная', type: 'extended'}
  ];

  constructor(
      private _priceService: PriceService,
      private _injector: Injector,
      private _loading: LoadingService
  ) {
    super(_loading);
  }

  ngOnInit(){
    this.sheet = new Sheet;
    this.sheet.price_config = new PriceConfig;
    this.currencies = ['RUB', 'USD', 'EUR', 'JPY'];
    this.retail_markup = [];
  }

  routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree): void {
    this.price_id = currTree.parent(curr).getParam('id');
    this.id = curr.getParam('id');
    this.getSheet();
  }

  getSheet() {
    this._priceService.show_sheet(this.price_id, this.id).subscribe(
        sheet => this.fillAndConfigure(<Sheet> sheet),
        error => this.errorMessage = <any>error);
  }

  private fillAndConfigure(sheet: Sheet) {
    this.sheet = sheet;
    this.simple_configuration = {
      first_column: sheet.first_column,
      last_column: sheet.last_column
    };
    this.simple_configuration.columns = _.range(sheet.first_column, sheet.last_column + 1, 1);

    _.each(sheet.price_config.retail_markup, (v, k) => {
      this.retail_markup.push({
        price: parseInt(k),
        value: parseInt(v)
      });
    });

    this.data_loaded = true;
  }

  addRetailMarkup(){
    this.retail_markup.push({
      price: 0,
      value: 0
    });
  }

  removeRetailMarkup(index) {
    _.pullAt(this.retail_markup, index);
  }

  selectColumn(column: string, number: number){
    for(let c in this.sheet.price_config) {
      if(/_column/.test(c) && this.sheet.price_config[c] == number) this.sheet.price_config[c] = null;
    }
    this.sheet.price_config[`${column}_column`] = number;
  }

  columnSelectedFor(column: string, number: number){
    return ( this.sheet.price_config[`${column}_column`] != null &&
        this.sheet.price_config[`${column}_column`] == number);
  }

  selectedCurrency(currency: string){
    return this.sheet.price_config.default_currency == currency;
  }

  selectCurrency(currency: string){
    this.sheet.price_config.default_currency = currency;
  }

  selectedConfiguration(conf: string){
    return this.configuration_type == conf;
  }

  selectConfiguration(conf: string){
    this.configuration_type = conf;
  }

  updateSheet(){
    this.sheet.price_config.retail_markup = {};
    
    _.each(this.retail_markup, (v)=>{
      this.sheet.price_config.retail_markup[v.price] = v.value;
    });

    this._priceService.update_sheet(this.price_id, this.id, this.sheet).subscribe(
        sheet => {
          this.sheet = <Sheet> sheet;
        },
        error => this.errorMessage = <any> error);
  }

  parseOffers(){
    this._priceService.patch_action_sheet('parse_offers', this.price_id, this.id, {}).subscribe(
        data => {
          this.sheet = <Sheet> data
        },
        error => this.errorMessage = <any> error
    );
  }
}