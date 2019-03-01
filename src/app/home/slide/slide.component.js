var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
var ONE_HEIGHT = 100;
var SlideComponent = (function () {
    function SlideComponent(router) {
        this.router = router;
        this.bannerList = [];
        this.showList = [];
        this.dataLength = 0;
        this.initOffsetY = 0;
        this.maxOffset = 0;
        this.minOffset = 0;
        this.currentOffset = 0;
        this.currentItemIndex = 0;
        this.oneGroupNum = 4;
        this.translateTimer = null;
        this.cycleTimer = null;
    }
    Object.defineProperty(SlideComponent.prototype, "bannerData", {
        set: function (data) {
            if (!data) {
                return;
            }
            this.bannerList = data;
            this.dataLength = this.bannerList.length;
            this.getShowList();
        },
        enumerable: true,
        configurable: true
    });
    SlideComponent.prototype.ngOnInit = function () {
    };
    SlideComponent.prototype.ngOnDestroy = function () {
        clearTimeout(this.translateTimer);
    };
    SlideComponent.prototype.getShowList = function () {
        if (this.dataLength > this.oneGroupNum) {
            for (var i = 0; i < 3; i++) {
                this.showList = this.showList.concat(this.bannerList);
            }
            this.calculateInitOffsetY();
            this.getOffsetRange();
            this.cycleShow();
        }
        else {
            this.showList = this.bannerList;
        }
    };
    SlideComponent.prototype.calculateInitOffsetY = function () {
        this.initOffsetY = -1 * this.dataLength * ONE_HEIGHT;
        this.currentOffset = this.initOffsetY;
        this.currentItemIndex = this.dataLength;
        this.slideListElement.nativeElement.style.transform = 'translate(0px,' + this.initOffsetY + 'px)';
    };
    SlideComponent.prototype.getOffsetRange = function () {
        this.maxOffset = this.initOffsetY + ONE_HEIGHT;
        this.minOffset = this.initOffsetY - (this.dataLength - this.oneGroupNum + 1) * ONE_HEIGHT;
    };
    SlideComponent.prototype.cycleShow = function () {
        var _this = this;
        clearInterval(this.cycleTimer);
        this.cycleTimer = setInterval(function () {
            _this.downOperation();
        }, 5000);
    };
    SlideComponent.prototype.upArrow = function () {
        clearInterval(this.cycleTimer);
        if (this.currentOffset < this.maxOffset) {
            this.currentItemIndex -= 1;
            if ((this.currentItemIndex + 1) * -1 * ONE_HEIGHT === this.currentOffset) {
                this.currentOffset += ONE_HEIGHT;
                this.translateY();
            }
            else if (this.currentOffset <= this.minOffset) {
                this.currentOffset += ONE_HEIGHT;
                this.translateY();
            }
        }
        else {
            this.currentItemIndex = 2 * this.dataLength - 2;
            this.currentOffset = -1 * this.currentItemIndex * ONE_HEIGHT;
            this.slideListElement.nativeElement.style.transform = 'translate(0px,' + (this.currentOffset - ONE_HEIGHT) + 'px)';
            this.slideListElement.nativeElement.style.transition = '0s ease-out';
            this.translateY();
        }
        this.cycleShow();
    };
    SlideComponent.prototype.downArrow = function () {
        clearInterval(this.cycleTimer);
        this.downOperation();
    };
    SlideComponent.prototype.downOperation = function () {
        if (this.currentOffset > this.minOffset) {
            this.currentItemIndex += 1;
            if ((this.currentItemIndex - this.oneGroupNum) * -1 * ONE_HEIGHT === this.currentOffset) {
                this.currentOffset -= ONE_HEIGHT;
                this.translateY();
            }
            else if (this.currentOffset >= this.maxOffset) {
                this.currentOffset -= ONE_HEIGHT;
                this.translateY();
            }
        }
        else {
            this.currentItemIndex = this.dataLength + 1;
            this.currentOffset = -1 * (this.currentItemIndex - this.oneGroupNum + 1) * ONE_HEIGHT;
            this.slideListElement.nativeElement.style.transform = 'translate(0px,' + (this.currentOffset + ONE_HEIGHT) + 'px)';
            this.slideListElement.nativeElement.style.transition = '0s ease-out';
            this.translateY();
        }
        this.cycleShow();
    };
    SlideComponent.prototype.translateY = function () {
        var _this = this;
        clearTimeout(this.translateTimer);
        this.translateTimer = setTimeout(function () {
            _this.slideListElement.nativeElement.style.transform = 'translate(0px,' + _this.currentOffset + 'px)';
            _this.slideListElement.nativeElement.style.transition = '0.5s ease-out';
        }, 0);
    };
    SlideComponent.prototype.selectItem = function (i) {
        this.currentItemIndex = i;
    };
    SlideComponent.prototype.goToVodDetail = function () {
        this.router.navigate(['detail/', this.showList[this.currentItemIndex]['id']]);
    };
    __decorate([
        ViewChild('slideListElement'),
        __metadata("design:type", ElementRef)
    ], SlideComponent.prototype, "slideListElement", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], SlideComponent.prototype, "bannerData", null);
    SlideComponent = __decorate([
        Component({
            selector: 'app-slide',
            templateUrl: './slide.component.html',
            styleUrls: ['./slide.component.scss']
        }),
        __metadata("design:paramtypes", [Router])
    ], SlideComponent);
    return SlideComponent;
}());
export { SlideComponent };
