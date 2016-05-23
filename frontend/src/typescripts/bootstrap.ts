///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>
///<reference path="../../typings/tsd.d.ts"/>

import 'rxjs/Rx';

import { bootstrap }         from "angular2/platform/browser";
import { HTTP_PROVIDERS }    from "angular2/http";
import { AppComponent }      from "./app.component";
import { enableProdMode }    from "angular2/core";

import { PriceService }      from './prices/services/price.service'
import { ExportService }     from './exports/services/export.service'
import { LoadingService }    from './main/services/loading.service'

enableProdMode();

bootstrap(AppComponent, [ HTTP_PROVIDERS, PriceService, ExportService, LoadingService ]);