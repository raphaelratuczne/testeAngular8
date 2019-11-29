import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'myPipe'
})
export class MyPipePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: any, ...args: any[]): any {
    console.log('value',value,'args',args);
    return this.sanitizer.bypassSecurityTrustHtml(`<span style="color:${args[0]||'blue'}">${value}</span>`);
  }

}
