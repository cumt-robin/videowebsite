import { Directive, ElementRef, Renderer, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appFocus]'
})

export class FocusDirective {

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer
    ) {}

    @HostBinding('@posterScale') state: string;

    @HostListener('mouseenter')
    enter() {
        this.state = 'focusEnd';
    }

    @HostListener('mouseleave')
    leave() {
        this.state = 'blurEnd';
    }
}
