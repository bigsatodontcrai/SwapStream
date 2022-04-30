import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SearchModuleComponent } from '../search-module/search-module.component'
import { playlist } from "../playlist"
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-display',
  templateUrl: './list-display.component.html',
  styleUrls: ['./list-display.component.css']
})
export class ListDisplayComponent implements OnInit {
  @Input() source?: string;
  @Input() search = false;
  @Input() song_display = false;
  @ViewChild(SearchModuleComponent, { static: true }) searchModule !: SearchModuleComponent;
  @Input() json: any | object;
  selected_list = 0;
  selected_owner = '';
  selected_img = '';
  song_list: any[] = [];
  @Input() song_list2: any[] = [];
  playlist = [];
  navigate = false;
  constructor() { }

  Playlist: playlist[] = []

  ngOnInit(): void {
  }

  select(index: number): void {
    this.selected_list = index;
    this.song_list = this.json.playlists[this.selected_list]
    console.log(this.json.playlists[this.selected_list])
    this.navigate = true;
    const item = this.song_list[1]
    console.log(item.info)
    this.selected_owner = item.info[0].name
    this.selected_img = item.image
  }

  set(): void {
    //this.song_list2 = this.json.query
    console.log(this.song_list2)
  }

  done(): void {
    console.log(this.json.playlists)
    this.playlist = this.json.playlists
  }

  itemTest(): void {

  }

  goBack(): void {
    this.navigate = false;
  }


}
