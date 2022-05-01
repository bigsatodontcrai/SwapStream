import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-module',
  templateUrl: './search-module.component.html',
  styleUrls: ['./search-module.component.css']
})
export class SearchModuleComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<string>();
  @Output() otherItemEvent = new EventEmitter<string>();
  constructor() { }
  value = '';
  dropdown = '';

  ngOnInit(): void {
  }

  onEnter(value: string) { 
    this.newItemEvent.emit(value)
    }
  onChoice(event: any) {
    let value = event.target.value
    this.otherItemEvent.emit(value)
  }
}
