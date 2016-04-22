import { Component, Injector }         from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgForm, NgClass, NgStyle } from 'angular2/common';
import { ROUTER_DIRECTIVES, Router, RouteConfig, RouteParams, OnActivate, ComponentInstruction } from 'angular2/router';

import { Price, Sheet, PriceConfig }  from './../../models/Price'
import { PriceService }               from './../../services/price.service'

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
  directives: [ ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle ],
  pipes: [  ]
})

export class SheetEditComponent implements OnActivate {
  public price_id: string;
  public price: Price;
  public id: string;
  public sheet: Sheet;
  public errorMessage: any;
  public simple_configuration: SheetSimpleConfiguration;
  public data_loaded: boolean = false;
  public currencies: string[];

  public configuration_type: string = 'simple';
  public configuration_types: Object[] = [
    {title: 'Простая', type: 'simple'}, {title: 'Сложная', type: 'extended'}
  ];

  constructor(
      private _params: RouteParams,
      private _parent_params: RouteParams,
      private _priceService: PriceService,
      private _router: Router,
      private _injector: Injector
  ) {
    this.sheet = new Sheet;
    this.sheet.price_config = new PriceConfig;
    this._parent_params = this._injector.parent.parent.get(RouteParams);
    this.currencies = ['RUB', 'USD', 'EUR', 'JPY'];
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
    this.data_loaded = true;
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

  routerOnActivate(to: ComponentInstruction, from: ComponentInstruction) {
    this.price_id = this._parent_params.get('id');
    this.id = this._params.get('id');
    this.getSheet();
  }
}