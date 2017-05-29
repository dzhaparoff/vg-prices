import { Injectable }   from '@angular/core';
import { Http, Headers, RequestOptions, Request, Response } from '@angular/http';
import { Observable }   from 'rxjs/Observable';

import { Price, Sheet } from './../models/Price';

import { LoadingService } from './../../main/services/loading.service';

@Injectable()

export class PriceService {
  constructor (
      private http: Http,
      public loading: LoadingService
  ) { }

  private _PricesUrl = '/api/prices';  // URL to web api

  query() {
    this.loading.startLoading('query', 'prices');
    return this.http.get(this._PricesUrl)
        .map(res => <Price[]> res.json())
        .do(data => {
          this.loading.stopLoading('query', 'prices');
          }
        )
        .catch(this.handleError);
  }

  query_sheets(id: string){
    this.loading.startLoading('query', 'sheets');
    return this.http.get(`${this._PricesUrl}/${id}/sheets`)
        .map(res => <Sheet[]> res.json())
        .do(data => this.loading.stopLoading('query', 'sheets'))
        .catch(this.handleError);
  }

  create(price: Price) {
    let body = JSON.stringify(price);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.loading.startLoading('new', 'prices');

    return this.http.post(this._PricesUrl, body, options)
        .map(res => <Price> res.json())
        .do(data => this.loading.stopLoading('new', 'prices'))
        .catch(this.handleError)
  }

  show(id: string) {
    this.loading.startLoading('show', 'prices');

    return this.http.get(`${this._PricesUrl}/${id}`)
        .map(res => <Price> res.json())
        .do(data => this.loading.stopLoading('show', 'prices'))
        .catch(this.handleError);
  }

  show_sheet(price_id: string, id: string) {
    this.loading.startLoading('show', 'sheets');
    return this.http.get(`${this._PricesUrl}/${price_id}/sheets/${id}`)
        .map(res => <Sheet> res.json())
        .do(data => this.loading.stopLoading('show', 'sheets'))
        .catch(this.handleError);
  }

  update(id: string, price: Price) {
    let body = JSON.stringify(price);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.loading.startLoading('update', 'prices');

    return this.http.put(`${this._PricesUrl}/${id}`, body, options)
        .map(res => <Price> res.json())
        .do(data => this.loading.stopLoading('update', 'prices'))
        .catch(this.handleError)
  }

  update_sheet(price_id: string, id: string, sheet: Sheet){
    let body = JSON.stringify(sheet);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.loading.startLoading('update', 'sheets');

    return this.http.put(`${this._PricesUrl}/${price_id}/sheets/${id}`, body, options)
        .map(res => <Sheet> res.json())
        .do(data => this.loading.stopLoading('update', 'sheets'))
        .catch(this.handleError)
  }

  destroy(price: Price) {
    const id = price.id.$oid;
    this.loading.startLoading('destroy', 'prices');
    return this.http.delete(`${this._PricesUrl}/${id}`)
        .map(res => <Price> res.json())
        .do(data => this.loading.stopLoading('destroy', 'prices'))
        .catch(this.handleError)
  }

  patch_action(action: string, id: string, d: Object) {
    this.loading.startLoading(action, 'prices');
    let data = JSON.stringify(d);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.patch(`${this._PricesUrl}/${id}/${action}`, data, options)
        .map(res => res.json())
        .do(data => this.loading.stopLoading(action, 'prices'))
        .catch(this.handleError)
  }

  collection_action(action: string, data: Object) {
    this.loading.startLoading(action, 'prices');
    let body = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${this._PricesUrl}/${action}`, body, options)
        .map(res => res.json())
        .do(data => this.loading.stopLoading(action, 'prices'))
        .catch(this.handleError)
  }

  patch_action_sheet(action: string, price_id: string, id: string, data: Object) {
    this.loading.startLoading(action, 'sheets');
    return this.http.patch(`${this._PricesUrl}/${price_id}/sheets/${id}/${action}`, JSON.stringify(data))
        .map(res => res.json())
        .do(data => this.loading.stopLoading(action, 'sheets'))
        .catch(this.handleError)
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}