import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { PricesComponent } from './prices/components/main';
import { ExportsComponent } from './exports/components/main';
import { DashboardComponent } from './dashboard.component';

@Component({
  selector: 'app-main',
  templateUrl: '/ng/templates/main.tmpl.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS
  ]
})

@RouteConfig([
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/prices/...',
    name: 'Prices',
    component: PricesComponent
  },
  {
    path: '/exports/...',
    name: 'Exports',
    component: ExportsComponent
  }
])

export class AppComponent { }