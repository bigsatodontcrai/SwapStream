import { Component, OnInit, Input } from '@angular/core';
import {playlist} from "../playlist"

@Component({
  selector: 'app-list-display',
  templateUrl: './list-display.component.html',
  styleUrls: ['./list-display.component.css']
})
export class ListDisplayComponent implements OnInit {
  @Input() json = '';
  constructor() { }

  Playlist: playlist[] = [
    {title: "pog1", owner: "josh", source: "apple"},
    {title: "pog2", owner: "josh", source: "apple"},
    {title: "pog3", owner: "josh", source: "apple"},
    {title: "pog4", owner: "josh", source: "apple"},
    {title: "pog5", owner: "josh", source: "apple"},
    {title: "pog6", owner: "josh", source: "apple"},
    {title: "pog7", owner: "josh", source: "apple"},
    {title: "pog8", owner: "josh", source: "apple"},
    {title: "pog9", owner: "josh", source: "apple"},
    {title: "pog10", owner: "josh", source: "apple"},
    {title: "pog11", owner: "josh", source: "apple"}
  ]

  ngOnInit(): void {
  }

}
