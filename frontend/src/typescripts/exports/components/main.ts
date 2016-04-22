import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteParams, RouteConfig } from 'angular2/router';

import { Export } from './../models/Export'
import { ExportService } from './../services/export.service'

import { ExportsListComponent } from './list'
import { ExportsShowComponent } from './show'

@RouteConfig([
  {
    path: '/',
    name: 'ExportsList',
    component: ExportsListComponent
  },
  {
    path: '/:id/',
    name: 'ExportsShow',
    component: ExportsShowComponent
  }
])

@Component({
  selector:    'app-exports',
  templateUrl: '/ng/templates/exports/main.tmpl.html',
  directives: [ ROUTER_DIRECTIVES ]
})

export class ExportsComponent { }