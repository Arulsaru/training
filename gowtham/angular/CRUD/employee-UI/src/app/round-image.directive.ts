import { Directive, ElementRef, HostListener } from '@angular/core';


@Directive({
  selector: '[appRoundImage]'
})
export class RoundImageDirective {

  constructor(private element: ElementRef) {
    // element.nativeElement.style.cssText = 'img:hover {opacity: 0.5}';
    element.nativeElement.style.borderRadius = '100%';
    element.nativeElement.style.width = '150px';
    element.nativeElement.style.height = '150px';  

   }

   @HostListener('mouseenter') onMouseEnter() {
    this.element.nativeElement.style.transform = 'scale(1.5)';
    // this.element.nativeElement.style.cursor = 'pointer';
   }
   
   @HostListener('mouseleave') onMouseLeave() {
    // this.element.nativeElement.style.opacity = '1';
    this.element.nativeElement.style.transform = 'scale(1)';
   }

}
