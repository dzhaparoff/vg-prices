import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filesize'
})

export class FileSizePipe implements PipeTransform {
  transform(value :number) : string {
    switch(true) {
      case value <= 1000 : return value.toString() + ' b';
      case value > 1000 && value <= 1000000 : return (value/1000).toFixed(2).toString() + ' kb';
      case value > 1000000 : return (value/1000000).toFixed(2).toString() + ' mb';
    }
  }
}