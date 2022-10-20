import { Directive, TemplateRef, Input, ViewContainerRef, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSeconds]'
})
export class SecondsDirective implements OnInit {

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private el: ElementRef) { }

    @Input() appSeconds: number = 0;
    ngOnInit(): void {
      if(this.appSeconds % 2 === 0) {
      console.log('even');
      this.viewContainer.createEmbeddedView(this.templateRef);
      
    }
    else {
      console.log('odd');
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}

