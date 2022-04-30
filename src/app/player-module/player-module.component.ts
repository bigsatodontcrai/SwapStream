import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-player-module',
  templateUrl: './player-module.component.html',
  styleUrls: ['./player-module.component.css']
})
export class PlayerModuleComponent implements OnInit {
  @Input() service = '';
  @Input() appleMusicKit: any;
  constructor() { }

  ngOnInit(): void {
  }

}
