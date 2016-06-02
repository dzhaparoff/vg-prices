import 'rxjs/Rx';
import 'moment/locale/ru';

import { bootstrap }        from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS }   from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router';

import { AppComponent }      from "./app.component";
import { enableProdMode }    from "@angular/core";

import { PriceService }      from './prices/services/price.service'
import { ExportService }     from './exports/services/export.service'
import { LoadingService }    from './main/services/loading.service'

// enableProdMode();

bootstrap(
    AppComponent,
    [
      HTTP_PROVIDERS, ROUTER_PROVIDERS, PriceService, ExportService, LoadingService
    ]
);