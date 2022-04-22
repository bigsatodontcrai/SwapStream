import { Component, AfterViewChecked, ViewChild, Renderer2, ElementRef, QueryList, Inject, ViewContainerRef } from '@angular/core';
import { NService } from './n.service'
import { WindowComponent } from './window/window.component'
import { LoginPageDirective } from './login-page.directive'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  title = 'SwapStream';
  userlogin = false;
  @ViewChild('div') div!: ElementRef;
  @ViewChild(LoginPageDirective, {static: true}) appLoginPage !: LoginPageDirective;
  // @ViewChild(LoaderDirective) appLoader !: LoaderDirective;
  
  //@ViewChildren('child', {read: ElementRef}) childComp:QueryList<ElementRef>
  constructor(private renderer: Renderer2, private host: ElementRef) {
    
  }

  // ngAfterViewChecked(){}

  addChild(){
    //let newChild = this.renderer.createElement('app-window');
    //this.renderer.appendChild(this.div.nativeElement, newChild)
    // this.appLoader.componentLoader()
    //this.nservice.appendComponentToBody(WindowComponent)
  }

  loadComponent(){
    //const viewContainerRef = this.appLoginPage.viewContainerRef;
    //viewContainerRef.clear();
    //const componentRef = viewContainerRef.createComponent<WindowComponent>(WindowComponent)
    this.userlogin = true;
  }
}
