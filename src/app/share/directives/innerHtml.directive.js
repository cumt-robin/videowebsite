var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, Renderer, Input } from '@angular/core';
var InnerHTMLDirective = (function () {
    function InnerHTMLDirective(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    Object.defineProperty(InnerHTMLDirective.prototype, "appInnerHTML", {
        set: function (data) {
            this.elementRef.nativeElement.innerHTML = data;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], InnerHTMLDirective.prototype, "appInnerHTML", null);
    InnerHTMLDirective = __decorate([
        Directive({
            selector: '[appInnerHTML]'
        }),
        __metadata("design:paramtypes", [ElementRef,
            Renderer])
    ], InnerHTMLDirective);
    return InnerHTMLDirective;
}());
export { InnerHTMLDirective };
