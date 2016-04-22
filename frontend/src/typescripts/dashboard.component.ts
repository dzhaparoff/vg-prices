import { Component } from 'angular2/core';
import { Router } from 'angular2/router';

@Component({
  selector:    'app-dashboard',
  templateUrl: '/ng/templates/dashboard.tmpl.html'
})

export class DashboardComponent {
  constructor(
      private _router: Router
  ) { }
}