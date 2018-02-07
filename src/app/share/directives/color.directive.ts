import { Directive, ElementRef, Renderer, Input } from '@angular/core';

@Directive({
    selector: '[appColor]'
})

export class ColorDirective {

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer
    ) {}

    @Input() set appColor(data: string) {
        this.renderer.setElementStyle(this.elementRef.nativeElement, 'color', data);
    }
}
