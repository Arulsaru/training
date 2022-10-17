import { Directive, ViewContainerRef, TemplateRef  } from '@angular/core';

@Directive({
  selector: '[appSecond]'
})

export class SecondDirective {
  second: number = new Date().getSeconds();

  constructor(private viewcontainer: ViewContainerRef, private template: TemplateRef<Object>) {

  }
  ngOnInit() {
    if(this.second % 2 === 0) {
      console.log("even");
      // this.viewcontainer.style.backgroundColor="red";
    }
    else {
      console.log("odd");
    }
  }
  

}
