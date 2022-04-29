import { Component, OnInit, Input } from '@angular/core';
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
  constructor() { }

  ngOnInit(): void {
  }

  isVisible(): void {
    
  }

}
