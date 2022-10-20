import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDirectory]'
})
export class DirectoryDirective {

  constructor(private element: ElementRef) {

    element.nativeElement.style.borderRadius = '100%';
    element.nativeElement.style.width = '150px';
    element.nativeElement.style.height = '150px';

  }

  @HostListener('mouseenter') onMouseEnter() {
    this.element.nativeElement.style.transform = 'scale(1.5)';
    this.element.nativeElement.style.cursor = 'pointer';
  }

  @HostListener('mouseleave') onMouseLeave() {
    // this.element.nativeElement.style.opacity = '1';
    this.element.nativeElement.style.transform = 'scale(1)';
  }
 
 

}
