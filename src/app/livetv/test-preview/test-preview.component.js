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
var TestPreviewComponent = (function () {
    function TestPreviewComponent() {
        this.imgList = [];
        this.backgroundList = [];
        this.oneWidth = 160;
        this.bigWidth = 200;
        this.margin = 2;
        this.wrapWidth = 1100;
        this.seekBarWidth = 0;
        this.listWidth = 0;
        this.showPreviewList = false;
        this.curIndex = 0;
    }
    TestPreviewComponent.prototype.ngOnInit = function () {
        this.getBackgroundList();
        this.calculateListWidth();
    };
    TestPreviewComponent.prototype.ngAfterViewInit = function () {
        this.seekBarWidth = this.seekBar.nativeElement.clientWidth;
    };
    TestPreviewComponent.prototype.getBackgroundList = function () {
        for (var i = 0, length_1 = this.imgList.length; i < length_1; i++) {
            this.backgroundList[i] = 'url(' + this.imgList[i] + ') center center no-repeat';
        }
    };
    TestPreviewComponent.prototype.calculateListWidth = function () {
        var imgLength = this.imgList.length;
        var width = (imgLength - 1) * (this.oneWidth + this.margin) + this.bigWidth;
        this.listRef.nativeElement.style.width = width + 'px';
        this.listWidth = width;
    };
    TestPreviewComponent.prototype.enterItem = function (i) {
        this.curIndex = i;
    };
    TestPreviewComponent.prototype.showPreview = function () {
        this.showPreviewList = true;
    };
    TestPreviewComponent.prototype.hidePreview = function () {
        this.showPreviewList = false;
    };
    TestPreviewComponent.prototype.mousemoveSeekbar = function (e) {
        var offsetX = e['offsetX'];
        offsetX = offsetX > 0 ? offsetX : 0;
        var ratio = offsetX / this.seekBarWidth;
        var bigOffset = ratio * this.listWidth;
        var leftValue = -1 * bigOffset + offsetX;
        this.listRef.nativeElement.style.left = leftValue + 'px';
        this.curIndex = Math.ceil(bigOffset / (this.oneWidth + this.margin)) - 1;
        if (this.curIndex < 0) {
            this.curIndex = 0;
        }
        else if (this.curIndex > this.backgroundList.length - 1) {
            this.curIndex = this.backgroundList.length - 1;
        }
    };
    __decorate([
        ViewChild('seekBar'),
        __metadata("design:type", ElementRef)
    ], TestPreviewComponent.prototype, "seekBar", void 0);
    __decorate([
        ViewChild('listRef'),
        __metadata("design:type", ElementRef)
    ], TestPreviewComponent.prototype, "listRef", void 0);
    TestPreviewComponent = __decorate([
        Component({
            selector: 'app-test-preview',
            templateUrl: './test-preview.component.html',
            styleUrls: ['./test-preview.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], TestPreviewComponent);
    return TestPreviewComponent;
}());
export { TestPreviewComponent };
