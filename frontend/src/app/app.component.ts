import { Component } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES, RouteTree } from '@angular/router';
import { PricesComponent } from './prices/components/main';
import { ExportsComponent } from './exports/components/main';
import { DashboardComponent } from './dashboard.component';

@Component({
  selector: 'app-main',
  templateUrl: '/ng/templates/main.tmpl.html',
  directives: [ ROUTER_DIRECTIVES ],
  providers: [  ],
})

@Routes([
  {
    path: '/',
    component: DashboardComponent,
  },
  {
    path: '/prices',
    component: PricesComponent
  },
  {
    path: '/exports',
    component: ExportsComponent
  }
])

export class AppComponent {
  constructor(
      private router: Router
  ){}
}