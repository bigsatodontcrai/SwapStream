import { Directive, OnDestroy, ViewContainerRef, Input, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { ListDisplayComponent } from './list-display/list-display.component'

@Directive({
  selector: '[appLoader]'
})
export class LoaderDirective implements OnDestroy {

  private componentInstance !: ComponentRef<ListDisplayComponent>;

  //@Input()
  // set appLoader(loading: boolean) {
  //   this.toggleLoader(loading);
  // }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  // toggleLoader(loading: boolean) {
  //   if (!this.componentInstance) {
  //     this.createLoaderComponent();
  //     this.makeComponentAChild();
  //   }

    
  // }

  private createLoaderComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ListDisplayComponent);
    this.componentInstance = this.viewContainerRef.createComponent(componentFactory);
  }

  private makeComponentAChild(){
    const loaderComponentElement = this.componentInstance.location.nativeElement;
    const sibling: HTMLElement = loaderComponentElement.previousSibling;
    sibling.insertBefore(loaderComponentElement, sibling.firstChild);
  }

  componentLoader(){
    this.createLoaderComponent();
    this.makeComponentAChild();
  }

  ngOnDestroy(): void {
    if (this.componentInstance) {
      this.componentInstance.destroy();
    }
  }

}
