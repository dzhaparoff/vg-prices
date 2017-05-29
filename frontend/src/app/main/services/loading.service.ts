import { Injectable }   from '@angular/core';
import * as Rx from 'rxjs/Rx';
import * as _ from 'lodash';

const LOADING_CLASS_ACTIVE = "loading-control loading";
const LOADING_CLASS_LOADED = "loading-control loaded";
const LOADING_CLASS_FIRST_LOAD = "loading-control loaded first-load";

export class Loading {
  loading: Boolean = false;
  loading_class: String = LOADING_CLASS_FIRST_LOAD;
  name : string = '';

  constructor(public method: String, public collection: String = "main"){
    this.name = `${collection}:${method}`
  }

  startLoading(){
    this.loading = true;
    this.loading_class = LOADING_CLASS_ACTIVE;
  }

  stopLoading(){
    this.loading = false;
    this.loading_class = LOADING_CLASS_LOADED;
  }
}

export class ProgressLoading extends Loading {
  progress: number;
  progress_max: number;

  constructor(public method: String, public collection: String = "main"){
    super(method, collection);
  }

  startLoading(){
    super.startLoading();
  }

  stopLoading(){
    super.stopLoading();
  }
}

@Injectable()

export class LoadingService {
  loadings: Array<Loading|ProgressLoading>;
  eventStream: Rx.Subject<any>;

  constructor () {
    this.loadings = [];
    this.eventStream = new Rx.Subject;
  }

  startLoading(method: string, collection: string) {
    let loading = this.find(method, collection);
    if(typeof loading == 'undefined') {
      loading = new Loading(method, collection);
      this.loadings.push(loading);
    }
    loading.startLoading();
    this.eventStream.next({loading: loading, cycle: 'start'});
  }

  stopLoading(method: string, collection: string){
    _.forEach(this.loadings,
        (loading) => {
          if(loading.method == method && loading.collection == collection){
            loading.stopLoading();
            this.eventStream.next({loading: loading, cycle: 'stop'});
          }
        }
    )
  }

  find_by_name(name: string){
    return _.find(this.loadings, {name: name});
  }

  find(method: string, collection: string) {
    return _.find(this.loadings, {method: method, collection: collection});
  }

}