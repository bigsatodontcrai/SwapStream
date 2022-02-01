import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-module',
  templateUrl: './search-module.component.html',
  styleUrls: ['./search-module.component.css']
})
export class SearchModuleComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<string>();
  constructor() { }
  value = '';

  ngOnInit(): void {
  }

  onEnter(value: string) { 
    this.value = value 
    this.newItemEvent.emit(value)
    console.log("king")
    }
}
