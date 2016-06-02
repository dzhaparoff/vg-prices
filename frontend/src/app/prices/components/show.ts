import { Component }            from '@angular/core';
import { ROUTER_DIRECTIVES, Router, Routes, RouteSegment, OnActivate } from '@angular/router';

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

@Routes([
  {
    path: '/',
    component: SheetListComponent
  },
  {
    path: '/sheets/:id',
    component: SheetEditComponent
  }
])

@Component({
  selector:    'app-price-show',
  templateUrl: '/ng/templates/prices/show.tmpl.html',
  directives: [ ROUTER_DIRECTIVES, FILE_UPLOAD_DIRECTIVES ],
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
      private _routeSegment: RouteSegment,
      private _priceService: PriceService,
      private _router: Router,
      private _loading: LoadingService
  ) {
    super(_loading);
  }

  ngOnInit() {
    this.price = new Price;
  }

  routerOnActivate(curr: RouteSegment): void {
    this.id = curr.getParam('id');
    this.getPrice();
    this.uploader = new FileUploader({ url: `/api/prices/${this.id}/spreadsheet`});
    this.uploader.onSuccessItem = (item, response) => {
      this.price = <Price> JSON.parse(response);
    }
  }

  private dragFileOver(e:boolean):void {
    this.hasFileOver = e;
  }

  private dropFile(e:any):void {

  }

  checkboxChanged(field, $event): void {
    this.price[field] = $event.target.checked;
  }

  cancel_and_delete_queue_files() {
    this.uploader.cancelAll();
    this.uploader.clearQueue();
  }

  puts(e :Object){
    console.log(e)
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