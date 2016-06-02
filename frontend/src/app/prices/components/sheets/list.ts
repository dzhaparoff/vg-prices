import { Component, Injector }         from '@angular/core';
import { ROUTER_DIRECTIVES, RouteSegment, RouteTree, OnActivate } from '@angular/router';

import { PricesShowComponent } from './../show'

import { Price, Sheet }             from './../../models/Price'
import { PriceService }      from './../../services/price.service'

import { ComponentController }  from './../../../main/component.controller';
import { LoadingService }       from './../../../main/services/loading.service'

import { FormattedDatePipe } from './../../../pipes/formatted_date.pipe';

@Component({
  selector:    'app-price-sheets-list',
  templateUrl: '/ng/templates/sheets/list.tmpl.html',
  directives: [ ROUTER_DIRECTIVES ],
  pipes: [ FormattedDatePipe ]
})

export class SheetListComponent extends ComponentController implements OnActivate {
  public collection: string = 'sheets';
  public price_id: string;
  public sheets: Sheet[];
  public errorMessage: any;
  public priceComponent: PricesShowComponent;

  constructor(
      private _priceService: PriceService,
      private _injector: Injector,
      private _loading: LoadingService
  ) {
    super(_loading);
    this.sheets = [];
  }

  ngOnInit(){

  }

  routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree): void {
    this.price_id = currTree.parent(curr).getParam('id');
    this.getSheets();
    this.priceComponent = this._injector.get(PricesShowComponent);
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
}