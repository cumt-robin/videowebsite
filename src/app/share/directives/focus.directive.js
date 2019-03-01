var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, Renderer, HostListener, HostBinding } from '@angular/core';
var FocusDirective = (function () {
    function FocusDirective(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    FocusDirective.prototype.enter = function () {
        this.state = 'focusEnd';
    };
    FocusDirective.prototype.leave = function () {
        this.state = 'blurEnd';
    };
    __decorate([
        HostBinding('@posterScale'),
        __metadata("design:type", String)
    ], FocusDirective.prototype, "state", void 0);
    __decorate([
        HostListener('mouseenter'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], FocusDirective.prototype, "enter", null);
    __decorate([
        HostListener('mouseleave'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], FocusDirective.prototype, "leave", null);
    FocusDirective = __decorate([
        Directive({
            selector: '[appFocus]'
        }),
        __metadata("design:paramtypes", [ElementRef,
            Renderer])
    ], FocusDirective);
    return FocusDirective;
}());
export { FocusDirective };
