import { Component, AfterViewInit, ViewChild, ViewContainerRef, Input, OnDestroy } from '@angular/core';
import { LoginPageDirective } from '../login-page.directive'
import { ListDisplayComponent } from '../list-display/list-display.component'
import { LandingPageComponent } from '../landing-page/landing-page.component'
import { SearchModuleComponent } from '../search-module/search-module.component'

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements AfterViewInit {

  @ViewChild(SearchModuleComponent, {static: true}) searchModule !: SearchModuleComponent;
  item = '';

  ngAfterViewInit() {
    
    
  }

  addItem(newItem: string) {
    this.item = newItem
    console.log("here")
    console.log(newItem)
    
  }

  loadComponent() {
    // const viewContainerRef = this.appLoginPage.viewContainerRef;
    // viewContainerRef.clear();
    // const componentRef = viewContainerRef.createComponent<SearchModuleComponent>(SearchModuleComponent)
    // componentRef.instance.newItemEvent.subscribe(this.addItem("cake"))
    // const componentRef2 = viewContainerRef.createComponent<ListDisplayComponent>(ListDisplayComponent)
    // componentRef2.instance.json = this.item
    
  }
  

}
