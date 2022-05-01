import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appListGenerator]'
})
export class ListGeneratorDirective {
  @Input()
  owner: string;
  plist: string;


  constructor() {
    this.owner = '';
    this.plist = '';
   }

}
