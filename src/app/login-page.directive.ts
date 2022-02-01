import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appLoginPage]'
})
export class LoginPageDirective {

  constructor(public viewContainerRef: ViewContainerRef ) { }

}
