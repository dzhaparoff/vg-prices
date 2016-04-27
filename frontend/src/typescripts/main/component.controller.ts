import * as Rx            from 'rxjs/Rx';
import { Loading, ProgressLoading } from './services/loading.service'

interface LoadingPart {
  loading: Loading|ProgressLoading;
  cycle: String;
}

export class ComponentController {
  collection: String = 'main';
  loading_observable: Rx.Observable<LoadingPart>;

  loading_class: String  = "";
  loading:       Boolean = false;

  private _loading_subscription: Rx.Subscription;
  
  constructor(_loading){
    this.loading_observable = _loading.eventStream.filter((e) => { return e.loading.collection == this.collection });
    this._loading_subscription = this.loading_observable.subscribe(
        (l)=>{
          this.loading        = l.loading.loading;
          this.loading_class  = l.loading.loading_class;
        }
    );
  }

  getLoading(){
    console.log(this.loading_observable);
  }

  ngOnInit(){

  }

  ngOnDestroy(){
    this._loading_subscription.unsubscribe();
  }
}