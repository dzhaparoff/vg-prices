import { Component }            from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgForm, NgClass, NgStyle } from 'angular2/common';
import { ROUTER_DIRECTIVES, RouteConfig, Router, RouteParams, OnActivate, ComponentInstruction } from 'angular2/router';

import { FILE_UPLOAD_DIRECTIVES, FileUploader } from 'ng2-file-upload';

import { Price }                from './../models/Price'
import { PriceService }         from './../services/price.service'

import { FileSizePipe }         from './../../pipes/filesize.pipe';
import { FormattedDatePipe }    from './../../pipes/formatted_date.pipe';

import { PricesEditComponent }  from './edit'

import { SheetListComponent }   from './sheets/list'
import { SheetEditComponent }   from './sheets/edit'

import { ComponentController }  from './../../main/component.controller';
import { LoadingService }       from './../../main/services/loading.service'

@RouteConfig([
  {
    path: '/',
    name: 'PricesEdit',
    component: SheetListComponent
  },
  {
    path: '/sheets/:id',
    name: 'SheetsEdit',
    component: SheetEditComponent
  }
])

@Component({
  selector:    'app-price-show',
  templateUrl: '/ng/templates/prices/show.tmpl.html',
  directives: [ ROUTER_DIRECTIVES, FILE_UPLOAD_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle ],
  pipes: [ FileSizePipe, FormattedDatePipe ]
})

export class PricesShowComponent extends ComponentController implements OnActivate {

  collection: string = 'prices';
  price :Price;
  errorMessage :any;
  id :string;

  private uploader :FileUploader;
  private hasFileOver :boolean = false;

  constructor(
      private _params: RouteParams,
      private _priceService: PriceService,
      private _router: Router,
      private _loading: LoadingService
  ) {
    super(_loading);
    this.price = new Price;
  }

  private dragFileOver(e:boolean) {
    this.hasFileOver = e;
  }

  private dropFile(e:any) {

  }

  cancel_and_delete_queue_files() {
    this.uploader.cancelAll();
    this.uploader.clearQueue();
  }

  puts(e :Object){
    console.log(e)
  }

  routerOnActivate(to: ComponentInstruction, from: ComponentInstruction) {
    this.id = this._params.get('id');
    this.getPrice();
    this.uploader = new FileUploader({ url: `/api/prices/${this.id}/spreadsheet`});
    this.uploader.queueLimit = 1;
    this.uploader.onSuccessItem = (item, response) => {
      this.price = <Price> JSON.parse(response);
    }
  }

  getPrice() {
    this._priceService.show(this.id).subscribe(
        price =>  this.price = <Price> price,
        error  => this.errorMessage = <any>error);
  }

  updatePrice() {
    this._priceService.update(this.id, this.price).subscribe(
        price => {
          this.price = <Price> price;
          //this._router.navigate(['PricesList'])
        },
        error => this.errorMessage = <any> error);
  }

}