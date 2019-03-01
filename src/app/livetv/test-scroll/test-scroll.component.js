var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { VerticalScroll } from '../../share/services/vertical-scroll.service';
import { HorizontalScroll } from '../../share/services/horizontal-scroll.service';
import { EventService } from '../../share/services/event.service';
var TestScrollComponent = (function () {
    function TestScrollComponent(verticalScroll, horizontalScroll) {
        this.verticalScroll = verticalScroll;
        this.horizontalScroll = horizontalScroll;
        this.isDragging = false;
    }
    TestScrollComponent.prototype.ngOnInit = function () {
        var _this = this;
        EventService.removeAllListeners(['SCROLLBAR_DRAG_START']);
        EventService.on('SCROLLBAR_DRAG_START', function () {
            _this.isDragging = true;
        });
        EventService.removeAllListeners(['SCROLLBAR_DRAG_END']);
        EventService.on('SCROLLBAR_DRAG_END', function () {
            _this.isDragging = false;
        });
    };
    TestScrollComponent.prototype.ngAfterViewInit = function () {
        this.initializeVerticalScroll();
        this.initializeHorizontalScroll();
    };
    TestScrollComponent.prototype.ngOnDestroy = function () {
        this.verticalScroll.unbindEvent();
        this.horizontalScroll.unbindEvent();
    };
    TestScrollComponent.prototype.initializeVerticalScroll = function () {
        this.verticalScroll.initializeElement(this.parentElement.nativeElement, this.contentBox.nativeElement, this.content.nativeElement, this.scrollBox.nativeElement, this.scrollBar.nativeElement);
    };
    TestScrollComponent.prototype.initializeHorizontalScroll = function () {
        this.horizontalScroll.initializeElement(this.contentBox.nativeElement, this.content.nativeElement, this.horizontalBox.nativeElement, this.horizontalBar.nativeElement);
    };
    __decorate([
        ViewChild('parentElement'),
        __metadata("design:type", ElementRef)
    ], TestScrollComponent.prototype, "parentElement", void 0);
    __decorate([
        ViewChild('contentBox'),
        __metadata("design:type", ElementRef)
    ], TestScrollComponent.prototype, "contentBox", void 0);
    __decorate([
        ViewChild('content'),
        __metadata("design:type", ElementRef)
    ], TestScrollComponent.prototype, "content", void 0);
    __decorate([
        ViewChild('scrollBox'),
        __metadata("design:type", ElementRef)
    ], TestScrollComponent.prototype, "scrollBox", void 0);
    __decorate([
        ViewChild('scrollBar'),
        __metadata("design:type", ElementRef)
    ], TestScrollComponent.prototype, "scrollBar", void 0);
    __decorate([
        ViewChild('horizontalBox'),
        __metadata("design:type", ElementRef)
    ], TestScrollComponent.prototype, "horizontalBox", void 0);
    __decorate([
        ViewChild('horizontalBar'),
        __metadata("design:type", ElementRef)
    ], TestScrollComponent.prototype, "horizontalBar", void 0);
    TestScrollComponent = __decorate([
        Component({
            selector: 'app-test-scroll',
            templateUrl: './test-scroll.component.html',
            styleUrls: ['./test-scroll.component.scss']
        }),
        __metadata("design:paramtypes", [VerticalScroll,
            HorizontalScroll])
    ], TestScrollComponent);
    return TestScrollComponent;
}());
export { TestScrollComponent };
