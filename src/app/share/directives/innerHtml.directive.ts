import { Directive, ElementRef, Renderer, Input } from '@angular/core';

@Directive({
    selector: '[appInnerHTML]'
})

export class InnerHTMLDirective {

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer
    ) {}

    @Input() set appInnerHTML(data: string) {
        this.elementRef.nativeElement.innerHTML = data;
    }
}
