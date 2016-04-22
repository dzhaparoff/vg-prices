import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteParams, RouteConfig } from 'angular2/router';

import { Price } from './../models/Price'
import { PriceService } from './../services/price.service'

import { PriceListComponent } from './list'
import { PriceNewComponent } from './new'
import { PricesShowComponent } from './show'

@RouteConfig([
  {
    path: '/',
    name: 'PricesList',
    component: PriceListComponent
  },
  {
    path: '/new',
    name: 'PricesNew',
    component: PriceNewComponent
  },
  {
    path: '/:id/...',
    name: 'PricesShow',
    component: PricesShowComponent
  }
])

@Component({
  selector:    'app-prices',
  templateUrl: '/ng/templates/prices/main.tmpl.html',
  directives: [ ROUTER_DIRECTIVES ]
})

export class PricesComponent { }