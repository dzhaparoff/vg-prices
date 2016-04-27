import { Component }            from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgForm, NgClass, NgStyle } from 'angular2/common';
import { ROUTER_DIRECTIVES, RouteConfig, Router, RouteParams, OnActivate, ComponentInstruction } from 'angular2/router';

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
  directives: [ ROUTER_DIRECTIVES, FILE_UPLOAD_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle ],
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

  private uploader :FileUploader;
  private hasFileOver :boolean = false;

  constructor(
      private _params: RouteParams,
      private _exportService: ExportService,
      private _router: Router,
      private _loading: LoadingService
  ) {
    super(_loading);
    this.export_element = new Export
  }

  routerOnActivate(to: ComponentInstruction, from: ComponentInstruction) {
    this.id = this._params.get('id');
    this.loaded = false;
    this.updated_show = false;
    this.not_found_show = false;
    this.getExport();
  }

  getExport() {
    this._exportService.show(this.id).subscribe(
        e => {
          this.export_element = <Export> e;
          this.loaded = true;
        },
        error  => this.errorMessage = <any>error);
  }

  show(part) {
    this.updated_show = this.not_found_show = false;
    this[`${part}_show`] = true;
  }

  hide(part) {
    this[`${part}_show`] = false;
  }

  toggle(part) {
    let visible = this[`${part}_show`];
    this.updated_show = this.not_found_show = false;
    if(!visible) this[`${part}_show`] = true;
  }
}
