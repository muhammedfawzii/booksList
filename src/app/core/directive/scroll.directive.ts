import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScroll]',
  standalone: true
})
export class ScrollDirective {

  constructor(private el:ElementRef) { }
@HostListener('window:scroll') scroll(){
  let offsetElement = this.el.nativeElement.offsetTop-250
  let windowScroll = window.scrollY
  if(offsetElement <= windowScroll){
    this.el.nativeElement.classList.add('animate__fadeInLeft')
    this.el.nativeElement.classList.remove('animate__fadeOutLeft')
  }else{
    this.el.nativeElement.classList.remove('animate__fadeInLeft')
      this.el.nativeElement.classList.add('animate__fadeOutLeft')
  }
}
}
