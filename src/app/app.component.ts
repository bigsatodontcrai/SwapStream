import { Component, AfterViewChecked, ViewChild, Renderer2, ElementRef, QueryList, Inject, ViewContainerRef, Injectable } from '@angular/core';
import { NService } from './n.service'
import { WindowComponent } from './window/window.component'
import { LoginPageDirective } from './login-page.directive'
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {ApiServiceService } from './api-service.service';
import { HttpHeaders } from '@angular/common/http';
import { SearchModuleComponent } from './search-module/search-module.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  title = 'SwapStream';
  userlogin = false;
  item : any;
  
  @ViewChild('div') div!: ElementRef;
  @ViewChild(LoginPageDirective, {static: true}) appLoginPage !: LoginPageDirective;
  // @ViewChild(LoaderDirective) appLoader !: LoaderDirective;
  
  //@ViewChildren('child', {read: ElementRef}) childComp:QueryList<ElementRef>
  constructor(public http:HttpClient,private renderer: Renderer2, private host: ElementRef) {
    
  }

  // ngAfterViewChecked(){}

  addChild(){
    //let newChild = this.renderer.createElement('app-window');
    //this.renderer.appendChild(this.div.nativeElement, newChild)
    // this.appLoader.componentLoader()
    //this.nservice.appendComponentToBody(WindowComponent)
  }

  doThing(){
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');
    const url: string = 'http://127.0.0.1:5000/spotify';
    
    return this.http.get(url, {responseType:'json'});
  }

  loadComponent(){
    //const viewContainerRef = this.appLoginPage.viewContainerRef;
    //viewContainerRef.clear();
    //const componentRef = viewContainerRef.createComponent<WindowComponent>(WindowComponent)
    let thing = this.doThing();
    let item:any;
    thing.subscribe(
      (response:any)=>{
        this.userlogin = true;
        item = response;
        console.log(item);
        this.item = item;
        this.userlogin = true;
      },
      ()=>{
        console.error('Request failed bozo!');
        
      }
    );
    
    
    
    
  }
}
