import { Component, AfterViewInit, ViewChild, ViewContainerRef, Input, OnDestroy } from '@angular/core';
import { LoginPageDirective } from '../login-page.directive'
import { ListDisplayComponent } from '../list-display/list-display.component'
import { LandingPageComponent } from '../landing-page/landing-page.component'

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements AfterViewInit {

  @ViewChild(LoginPageDirective, {static: true}) appLoginPage !: LoginPageDirective;
  

  ngAfterViewInit() {
    
    
  }

  loadComponent() {
    const viewContainerRef = this.appLoginPage.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<ListDisplayComponent>(ListDisplayComponent)
  }
  

}
