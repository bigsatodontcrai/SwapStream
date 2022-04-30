import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {
  @Input() song = '';
  @Input() artist = '';
  @Input() visible = false;
  @Input() addable = false;
  @Input() index_in_list = 0;
  @Input() url = '';
  @Output() newItemEvent = new EventEmitter<number>();
  @Output() newURLEvent = new EventEmitter<any[]>();

  constructor() { }

  ngOnInit(): void {
  }

  isVisible(): void {
    
  }

  play(): void{
    this.newItemEvent.emit(this.index_in_list)
  }

  add(): void {
    let item: any[] = [];
    item.push(this.song)
    item.push(this.artist)
    item.push(this.url)
    console.log(item)
    this.newURLEvent.emit(item)
  }

}
