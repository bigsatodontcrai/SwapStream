import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-display',
  templateUrl: './list-display.component.html',
  styleUrls: ['./list-display.component.css']
})
export class ListDisplayComponent implements OnInit {
  @Input() json = '';
  constructor() { }

  ngOnInit(): void {
  }

}
