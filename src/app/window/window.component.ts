import { OnChanges, Component, AfterViewInit, ViewChild, ViewContainerRef, Input, OnDestroy } from '@angular/core';
import { LoginPageDirective } from '../login-page.directive'
import { ListDisplayComponent } from '../list-display/list-display.component'
import { SearchModuleComponent } from '../search-module/search-module.component'
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AppleMusicKitComponent } from '../apple-music-kit/apple-music-kit.component';
import { PlayerModuleComponent } from '../player-module/player-module.component';
// import * as data from '../../assets/json/placeholder.json';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements AfterViewInit, OnChanges {

  @ViewChild(SearchModuleComponent, { static: true }) searchModule !: SearchModuleComponent;
  @ViewChild(AppleMusicKitComponent, { static: true }) kitModule !: AppleMusicKitComponent;
  @ViewChild(ListDisplayComponent, { static: true }) listDisplayModule !: ListDisplayComponent;
  @ViewChild(PlayerModuleComponent, { static: true }) playerModule !: PlayerModuleComponent;
  @Input() data: any;
  @Input() appleMusicKit: any;
  @Input() isAM = false;
  indices: any[] = [];
  profile = false;
  item: any;
  item2: any;
  toggle = false;
  query: string[] = []
  open = false;
  create = false;
  most_recent: any[] = [];

  constructor(public http: HttpClient) {

  }

  setToggle(toggle: string) {
    //console.log(toggle)
    if (toggle == 'songs') {
      this.toggle = true;
      //console.log(this.toggle)
    } else {
      this.toggle = false;
    }
  }

  toggleCreate(){
    if(this.create){
      this.create = false;
    } else {
      this.create = true;
    }
  }

  getService(): string {
    if (this.isAM) {
      return 'Apple';
    }
    return 'Spotify'
  }

  openLibrary(): void {
    if (this.create) {
      this.create = false;
      return; // will change this to an enumerator approach soon
    }
    if (this.open == false)
      this.open = true;
    else
      this.open = false;
    
  }

  getQuery(query: string) {
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');
    let sp_query = query.replace(' ', '%20');
    const url: string = 'http://127.0.0.1:5000/spotify/' + sp_query;

    return this.http.get(url, { responseType: 'json' });
  }

  addSongToList(item: any){
    console.log(item)
    this.most_recent = item
    //this.listDisplayModule.setSongList(item)
  }

  playlistGetter(query: string){
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');
    let sp_query = query.replace(' ', '%20');
    const url: string = 'http://127.0.0.1:5000/search/user/' + sp_query;

    return this.http.get(url, { responseType: 'json' });
  }

  searchDatabaseForPlaylists(query: string){
    let item = this.playlistGetter(query)
    item.subscribe({
      next: (response: any) => {
        console.log(response)
        this.item2 = response 
      }, error: (error: any) => {
        console.error(error)
      }
    })
  }

  doSearch(query: string) {
    if(this.toggle && !this.isAM){
      this.doSpotifySearch(query)
    }
    if(!this.toggle){
      this.searchDatabaseForPlaylists(query)
    }
  }

  doSpotifySearch(query: string) {
    let thing = this.getQuery(query);
    let item: any;
    thing.subscribe({
      next: (response: any) => {
        item = response;
        console.log(item);
        this.item2 = item;
        this.query = item.query;
      },
      error: () => {
        console.error('Request failed bozo!');

      }
    });
  }

  ngOnChanges() {
    this.item = this.data;
  }

  ngAfterViewInit() {

  }

  setIndices(event: any[]) {
    this.indices = event;
    //console.log(this.indices)
    this.applePlayback(this.indices);
  }

  applePlayback(indices: any[]): void {
    //console.log(this.isAM)
    if (this.isAM) {
      //console.log("ting")
      //console.log(indices)
      this.playerModule.playAppleList(indices);
    }
  }

  doNothing(json: any) {
    if (this.isAM) {
      this.item = json
      //console.log("here")
      //console.log(json)
      //console.log(this.isAM)
    }
  }

  addItem(newItem: string) {
    console.log(`addItem(${newItem}) was called.`);
    //console.log("here")
    //console.log(newItem)
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
