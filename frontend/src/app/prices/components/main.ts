import { Component, OnInit } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';

import { Price } from './../models/Price'
import { PriceService } from './../services/price.service'

import { PriceListComponent } from './list'
import { PriceNewComponent } from './new'
import { PricesShowComponent } from './show'

@Routes([
  {
    path: '/',
    component: PriceListComponent
  },
  {
    path: '/new',
    component: PriceNewComponent
  },
  {
    path: '/:id',
    component: PricesShowComponent
  }
])

@Component({
  selector:    'app-prices',
  templateUrl: '/ng/templates/prices/main.tmpl.html',
  directives: [ ROUTER_DIRECTIVES ],
})

export class PricesComponent { }