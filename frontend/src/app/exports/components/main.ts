import { Component, OnInit } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';

import { Export } from './../models/Export'
import { ExportService } from './../services/export.service'

import { ExportsListComponent } from './list'
import { ExportsShowComponent } from './show'

@Routes([
  {
    path: '/',
    component: ExportsListComponent
  },
  {
    path: '/:id',
    component: ExportsShowComponent
  }
])

@Component({
  selector:    'app-exports',
  templateUrl: '/ng/templates/exports/main.tmpl.html',
  directives: [ ROUTER_DIRECTIVES ]
})

export class ExportsComponent { }