import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SearchModuleComponent } from '../search-module/search-module.component'
import {playlist} from "../playlist"
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-display',
  templateUrl: './list-display.component.html',
  styleUrls: ['./list-display.component.css']
})
export class ListDisplayComponent implements OnInit {
  @Input() source?:string;
  @Input() search = false;
  @Input() song_display = false;
  @ViewChild(SearchModuleComponent, { static: true }) searchModule !: SearchModuleComponent;
  @Input() json : any;
  selected_list = 0;
  playlist = [];
  constructor() { }

  Playlist: playlist[] = []

  ngOnInit(): void {
  }

  select(index:number): void{
    this.selected_list = index;
  }

  done(): void {
    console.log(this.json.playlists)
    this.playlist = this.json.playlists
  }


}
