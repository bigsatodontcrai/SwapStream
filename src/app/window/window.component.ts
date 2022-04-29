import { OnChanges, Component, AfterViewInit, ViewChild, ViewContainerRef, Input, OnDestroy } from '@angular/core';
import { LoginPageDirective } from '../login-page.directive'
import { ListDisplayComponent } from '../list-display/list-display.component'
import { SearchModuleComponent } from '../search-module/search-module.component'
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
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
  item2 : any;
  toggle =false;
  query :string[] = []

  constructor(public http: HttpClient) {

  }

  setToggle(toggle: string){
    console.log(toggle)
    if(toggle=='songs'){
      this.toggle = true;
      console.log(this.toggle)
    } else{
      this.toggle = false;
    }
  }

  getQuery(query: string) {
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');
    let sp_query = query.replace(' ', '%20');
    const url: string = 'http://127.0.0.1:5000/spotify/' + sp_query;

    return this.http.get(url, { responseType: 'json' });
  }

  doSearch(query: string){
    let thing = this.getQuery(query);
    let item : any;
    thing.subscribe(
      (response: any) => {
        item = response;
        console.log(item);
        this.item2 = item;
        this.query = item.query;
      },
      () => {
        console.error('Request failed bozo!');

      }
    );
  }

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
