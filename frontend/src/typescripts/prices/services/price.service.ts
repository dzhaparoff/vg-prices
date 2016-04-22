import { Injectable }   from 'angular2/core';
import { Http, Headers, RequestOptions, Request, Response } from 'angular2/http';
import { Observable }   from 'rxjs/Observable';

import { Price, Sheet } from './../models/Price'

@Injectable()

export class PriceService {
  constructor (private http: Http) {}

  private _PricesUrl = '/api/prices';  // URL to web api

  query() {
    return this.http.get(this._PricesUrl)
        .map(res => <Price[]> res.json())
        .do(data => console.log(data))
        .catch(this.handleError);
  }

  query_sheets(id: string){
    return this.http.get(`${this._PricesUrl}/${id}/sheets`)
        .map(res => <Sheet[]> res.json())
        .do(data => console.log(data))
        .catch(this.handleError);
  }

  create(price: Price) {
    let body = JSON.stringify(price);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this._PricesUrl, body, options)
        .map(res => <Price> res.json())
        .do(data => console.log(data))
        .catch(this.handleError)
  }

  show(id: string) {
    return this.http.get(`${this._PricesUrl}/${id}`)
        .map(res => <Price> res.json())
        .do(data => console.log(data))
        .catch(this.handleError);
  }

  show_sheet(price_id: string, id: string) {
    return this.http.get(`${this._PricesUrl}/${price_id}/sheets/${id}`)
        .map(res => <Sheet> res.json())
        .do(data => console.log(data))
        .catch(this.handleError);
  }

  update(id: string, price: Price) {
    let body = JSON.stringify(price);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(`${this._PricesUrl}/${id}`, body, options)
        .map(res => <Price> res.json())
        .do(data => console.log(data))
        .catch(this.handleError)
  }

  update_sheet(price_id: string, id: string, sheet: Sheet){
    let body = JSON.stringify(sheet);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(`${this._PricesUrl}/${price_id}/sheets/${id}`, body, options)
        .map(res => <Sheet> res.json())
        .do(data => console.log(data))
        .catch(this.handleError)
  }

  destroy(price: Price) {
    const id = price.id.$oid;
    return this.http.delete(`${this._PricesUrl}/${id}`)
        .map(res => <Price> res.json())
        .do(data => console.log(data))
        .catch(this.handleError)
  }

  patch_action(action: string, id: string, d: Object) {
    let data = JSON.stringify(d);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.patch(`${this._PricesUrl}/${id}/${action}`, data, options)
        .map(res => res.json())
        .do(data => console.log(data))
        .catch(this.handleError)
  }

  collection_action(action: string, data: Object) {
    let body = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${this._PricesUrl}/${action}`, body, options)
        .map(res => res.json())
        .do(data => console.log(data))
        .catch(this.handleError)
  }

  patch_action_sheet(action: string, price_id: string, id: string, data: Object) {
    return this.http.patch(`${this._PricesUrl}/${price_id}/sheets/${id}/${action}`, JSON.stringify(data))
        .map(res => res.json())
        .do(data => console.log(data))
        .catch(this.handleError)
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}