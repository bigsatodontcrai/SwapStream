import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SearchModuleComponent } from '../search-module/search-module.component'

@Component({
  selector: 'app-list-display',
  templateUrl: './list-display.component.html',
  styleUrls: ['./list-display.component.css']
})
export class ListDisplayComponent implements OnInit {
  @ViewChild(SearchModuleComponent, { static: true }) searchModule !: SearchModuleComponent;
  @Input() json : any;
  playlist = [];
  constructor() { }

  ngOnInit(): void {
    
  }

  done(): void {
    console.log(this.json.playlists)
    this.playlist = this.json.playlists
  }

}
