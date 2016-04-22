import { Component, Injector }         from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgForm, NgClass, NgStyle} from 'angular2/common';
import { ROUTER_DIRECTIVES, Router, RouteConfig, RouteParams, OnActivate, ComponentInstruction } from 'angular2/router';

import { Price, Sheet }             from './../../models/Price'
import { PriceService }      from './../../services/price.service'

import { PricesShowComponent }      from './../show'

import { FormattedDatePipe } from './../../../pipes/formatted_date.pipe';

@Component({
  selector:    'app-price-sheets-list',
  templateUrl: '/ng/templates/sheets/list.tmpl.html',
  directives: [ ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle],
  pipes: [ FormattedDatePipe ]
})

export class SheetListComponent implements OnActivate {
  public price_id: string;
  public sheets: Sheet[];
  public price_component: Object;
  public errorMessage :any;

  constructor(
      private _params: RouteParams,
      private _parent_params: RouteParams,
      private _priceService: PriceService,
      private _router: Router,
      private _injector: Injector
  ) {
    this.sheets = [];
    this._parent_params = this._injector.parent.parent.get(RouteParams);
  }

  create_sheets(){
    this._priceService.patch_action('create_sheets', this.price_id, {}).subscribe(
        data => {
          this.sheets = <Sheet[]> data.sheets
        },
        error => this.errorMessage = <any> error
    );
  }

  getSheets() {
    this._priceService.query_sheets(this.price_id).subscribe(
        sheets =>  this.sheets = <Sheet[]> sheets,
        error  => this.errorMessage = <any>error);
  }

  routerOnActivate(to: ComponentInstruction, from: ComponentInstruction) {
    this.price_id = this._parent_params.get('id');
    this.getSheets();
    this.price_component = this._injector.parent.get(PricesShowComponent);
  }
}