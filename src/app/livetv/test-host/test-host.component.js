var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, HostListener, HostBinding, Directive } from '@angular/core';
var ToggleClassDirective = (function () {
    function ToggleClassDirective() {
    }
    ToggleClassDirective.prototype.onEnter = function () {
        this.red = true;
    };
    ToggleClassDirective.prototype.onLeave = function () {
        this.red = false;
    };
    __decorate([
        HostBinding('class.red'),
        __metadata("design:type", Boolean)
    ], ToggleClassDirective.prototype, "red", void 0);
    __decorate([
        HostListener('mouseenter'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ToggleClassDirective.prototype, "onEnter", null);
    __decorate([
        HostListener('mouseleave'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ToggleClassDirective.prototype, "onLeave", null);
    ToggleClassDirective = __decorate([
        Directive({
            selector: '[appToggle]'
        })
    ], ToggleClassDirective);
    return ToggleClassDirective;
}());
export { ToggleClassDirective };
var TestHostComponent = (function () {
    function TestHostComponent() {
        this.time = 0;
    }
    TestHostComponent.prototype.onClick = function () {
        this.time++;
    };
    // @HostListener('document:click', ['$event'])
    // onDocumentClick(e) {
    //   this.time++;
    //   console.log(e);
    // }
    TestHostComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TestHostComponent.prototype, "onClick", null);
    TestHostComponent = __decorate([
        Component({
            selector: 'app-test-host',
            templateUrl: './test-host.component.html',
            styleUrls: ['./test-host.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], TestHostComponent);
    return TestHostComponent;
}());
export { TestHostComponent };
