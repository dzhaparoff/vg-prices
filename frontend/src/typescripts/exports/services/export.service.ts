import { Injectable }   from 'angular2/core';
import { Http, Headers, RequestOptions, Request, Response } from 'angular2/http';
import { Observable }   from 'rxjs/Observable';

import { Export } from './../models/Export'

@Injectable()

export class ExportService {
  constructor (private http: Http) {}

  private _ExportsUrl = '/api/exports';  // URL to web api

  query() {
    return this.http.get(this._ExportsUrl)
        .map(res => <Export[]> res.json())
        .do(data => console.log(data))
        .catch(this.handleError);
  }

  show(id: string) {
    return this.http.get(`${this._ExportsUrl}/${id}`)
        .map(res => <Export> res.json())
        .do(data => console.log(data))
        .catch(this.handleError);
  }

  destroy(price: Export) {
    const id = price.id.$oid;
    return this.http.delete(`${this._ExportsUrl}/${id}`)
        .map(res => <Export> res.json())
        .do(data => console.log(data))
        .catch(this.handleError)
  }

  collection_action(action: string, data: Object) {
    let body = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${this._ExportsUrl}/${action}`, body, options)
        .map(res => res.json())
        .do(data => console.log(data))
        .catch(this.handleError)
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}