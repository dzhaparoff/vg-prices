import { Component }            from '@angular/core';
import { ROUTER_DIRECTIVES, Router, RouteSegment, OnActivate } from '@angular/router';

import { FILE_UPLOAD_DIRECTIVES, FileUploader } from 'ng2-file-upload';

import { Export } from './../models/Export'
import { ExportService } from './../services/export.service'

import { FileSizePipe }         from './../../pipes/filesize.pipe';
import { FormattedDatePipe }    from './../../pipes/formatted_date.pipe';

import { ComponentController }  from './../../main/component.controller';
import { LoadingService }       from './../../main/services/loading.service'

@Component({
  selector:    'app-export-show',
  templateUrl: '/ng/templates/exports/show.tmpl.html',
  directives: [ ROUTER_DIRECTIVES, FILE_UPLOAD_DIRECTIVES ],
  pipes: [ FileSizePipe, FormattedDatePipe ]
})

export class ExportsShowComponent extends ComponentController implements OnActivate {
  collection: string = 'exports';
  export_element: Export;
  errorMessage: any;
  id: string;
  loaded: boolean;
  updated_show: boolean;
  not_found_show: boolean;
  deactivated_show: boolean;

  private uploader :FileUploader;
  private hasFileOver :boolean = false;

  constructor(
      private _exportService: ExportService,
      private _router: Router,
      private _loading: LoadingService
  ) {
    super(_loading);
    this.export_element = new Export
  }

  routerOnActivate(curr: RouteSegment): void {
    this.id = curr.getParam('id');
    this.loaded = false;
    this.updated_show = false;
    this.not_found_show = false;
    this.getExport();
  }

  getExport(): void {
    this._exportService.show(this.id).subscribe(
        e => {
          this.export_element = <Export> e;
          console.log(e)
          this.loaded = true;
        },
        error  => this.errorMessage = <any>error);
  }

  show(part): void {
    this.updated_show = this.not_found_show = this.deactivated_show = false;
    this[`${part}_show`] = true;
  }

  hide(part): void {
    this[`${part}_show`] = false;
  }

  toggle(part): void {
    let visible = this[`${part}_show`];
    this.updated_show = this.not_found_show = this.deactivated_show = false;
    if(!visible) this[`${part}_show`] = true;
  }
}
