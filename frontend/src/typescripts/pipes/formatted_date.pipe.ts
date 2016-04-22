import { Pipe, PipeTransform } from 'angular2/core';
//noinspection TypeScriptCheckImport
import moment from 'moment';

@Pipe({
  name: 'formatted_date'
})

export class FormattedDatePipe implements PipeTransform {
  transform(value:string, [format]) : string {
    return moment(value).format(format);
  }
}