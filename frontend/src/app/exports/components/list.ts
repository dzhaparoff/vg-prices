import { Component }            from '@angular/core';
import { ROUTER_DIRECTIVES }    from '@angular/router';

import { FormattedDatePipe }    from './../../pipes/formatted_date.pipe';
import { FileSizePipe }         from './../../pipes/filesize.pipe';

import { Export }               from './../models/Export'
import { ExportService }        from './../services/export.service'

import { ComponentController }  from './../../main/component.controller';
import { LoadingService }       from './../../main/services/loading.service'

//noinspection TypeScriptCheckImport
import _ from 'lodash'

@Component({
  selector:    'app-exports-list',
  templateUrl: '/ng/templates/exports/list.tmpl.html',
  directives: [ ROUTER_DIRECTIVES ],
  pipes: [ FormattedDatePipe, FileSizePipe ]
})

export class ExportsListComponent extends ComponentController {
  
  collection: string = 'exports';
  exports: Export[];
  errorMessage: any;
  selected_exports: Export[] = [];
  loaded: boolean = false;

  constructor(
      private _exportService: ExportService,
      private _loading: LoadingService
  ) {
    super(_loading);
  }

  ngOnInit() {
    this.getExports();
  }

  getExports() {
    this._exportService.query().subscribe(
        exports => { this.exports = exports; },
        error  => this.errorMessage = <any>error);
  }

  deleteExport(price: Export) {
    this._exportService.destroy(price).subscribe(
        p => { this.exports = this.exports.filter(o => o.id.$oid !== price.id.$oid) },
        error => this.errorMessage = <any>error);
  }

  exportSelected(price: Export) {
    return _.includes(this.selected_exports, price)
  }

  exportSelect(price: Export) {
    //if(_.includes(this.selected_exports, price))
    //  _.pull(this.selected_exports, price);
    //else
    let selected_before = false;
    if(_.includes(this.selected_exports, price))
      selected_before = true;
    this.selected_exports = <Export[]> [];
    if(!selected_before) this.selected_exports.push(price);
  }

  doExport(){
    const ids = _.map(this.selected_exports, (item) => item.id.$oid);
    this._exportService.collection_action('export', { ids: ids }).subscribe(
        res => {
          _.each(res, (e: Export) => {
            _.each(this.exports, (existed: Export, k: number) => {
              if(existed.id.$oid == e.id.$oid) this.exports[k] = e;
            })
          })
        },
        error => this.errorMessage = <any>error
    )
  }

  exportAvailable(){
    return this.selected_exports.length > 0
  }
}