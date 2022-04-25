import { OnChanges, Component, AfterViewInit, ViewChild, ViewContainerRef, Input, OnDestroy } from '@angular/core';
import { LoginPageDirective } from '../login-page.directive'
import { ListDisplayComponent } from '../list-display/list-display.component'
import { SearchModuleComponent } from '../search-module/search-module.component'
import { HttpClient } from '@angular/common/http';
// import * as data from '../../assets/json/placeholder.json';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements AfterViewInit, OnChanges {

  @ViewChild(SearchModuleComponent, {static: true}) searchModule !: SearchModuleComponent;
  @Input() data:any;
  item : any;

  ngOnChanges(){
    this.item = this.data;
  }

  ngAfterViewInit() {

  }

  addItem(newItem: string) {
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
