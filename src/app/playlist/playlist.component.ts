import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { SearchModuleComponent } from '../search-module/search-module.component'

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit, OnChanges {
  @ViewChild(SearchModuleComponent, { static: true }) searchModule !: SearchModuleComponent;
  @Input() playlist = [];

  title = '';
  @Input() owner = '';
  @Input() source = '';
  @Input() songs_visible = false;
 
  constructor() { 
    
  }

  ngOnInit(): void {
    this.title = this.playlist[0];
    //this.songs_visible = false;
  }

  ngOnChanges() {
    
  }

  dropDown() {
    if(this.songs_visible == false){
      this.songs_visible = true;
    } else {
      this.songs_visible = false;
    }
  }

}
