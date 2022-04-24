import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {
  @Input() song = '';
  @Input() artist = '';
  @Input() visible = false;
  constructor() { }

  ngOnInit(): void {
  }

  isVisible(): void {
    
  }

}
