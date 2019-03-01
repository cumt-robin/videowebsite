var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChildren, Input, QueryList, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { PosterScale } from '../../services/animationTrigger';
var PostersComponent = (function () {
    function PostersComponent(router, renderer) {
        this.router = router;
        this.renderer = renderer;
        this.offsetValue = [];
        this.minOffsetValue = [];
        this.isBigScreen = true;
        this.onePageItems = 6;
        this.onePageWidth = 1320;
        this.columns = [];
    }
    Object.defineProperty(PostersComponent.prototype, "columnData", {
        set: function (data) {
            this.columns = data;
            if (this.columns) {
                this.setMinOffsetValue();
            }
        },
        enumerable: true,
        configurable: true
    });
    PostersComponent.prototype.ngOnInit = function () {
        var _this = this;
        EventService.on('SCREEN_SIZE_CHANGE', function () {
            _this.screenSizeChange();
        });
        this.checkClientWidth();
    };
    PostersComponent.prototype.screenSizeChange = function () {
        this.checkClientWidth();
        this.setMinOffsetValue();
        for (var i = 0, length_1 = this.columns.length; i < length_1; i++) {
            this.setPosterListAnimation(0, i);
        }
    };
    PostersComponent.prototype.checkClientWidth = function () {
        if (document.body.clientWidth < 1440) {
            this.isBigScreen = false;
            this.onePageItems = 5;
            this.onePageWidth = 900;
        }
        else {
            this.isBigScreen = true;
            this.onePageItems = 6;
            this.onePageWidth = 1320;
        }
    };
    PostersComponent.prototype.setMinOffsetValue = function () {
        for (var i = 0, length_2 = this.columns.length; i < length_2; i++) {
            this.offsetValue[i] = 0;
            this.minOffsetValue[i] = -Math.floor(this.columns[i].vods.length / this.onePageItems) * this.onePageWidth;
        }
    };
    PostersComponent.prototype.clickLeftArrow = function (i) {
        this.setOffsetValue(true, i);
        this.setPosterListAnimation(1, i);
    };
    PostersComponent.prototype.clickRightArrow = function (i) {
        this.setOffsetValue(false, i);
        this.setPosterListAnimation(1, i);
    };
    PostersComponent.prototype.setPosterListAnimation = function (transformTime, i) {
        var child = this.posterListsRef.find(function (item, index) {
            return index === i;
        });
        child.nativeElement.style.transform = 'translate(' + this.offsetValue[i] + 'px, 0px)';
        child.nativeElement.style.transition = transformTime + 's ease-out';
    };
    PostersComponent.prototype.setOffsetValue = function (isPositive, i) {
        if (isPositive) {
            if (this.offsetValue[i] < 0) {
                this.offsetValue[i] += this.onePageWidth;
            }
        }
        else {
            if (this.offsetValue[i] > this.minOffsetValue[i]) {
                this.offsetValue[i] -= this.onePageWidth;
            }
        }
    };
    PostersComponent.prototype.gotoDetailPage = function (vod) {
        sessionStorage.setItem('VOD_DETAIL_PAGE_BACKGROUND_URL', vod.url);
        this.router.navigate(['detail', vod.id]);
    };
    PostersComponent.prototype.posterScaleDone = function (e) {
        if (e.toState === 'focusEnd') {
            this.renderer.addClass(e.element, 'focus-item');
        }
        else if (e.toState === 'blurEnd') {
            this.renderer.removeClass(e.element, 'focus-item');
        }
    };
    __decorate([
        ViewChildren('posterListsRef'),
        __metadata("design:type", QueryList)
    ], PostersComponent.prototype, "posterListsRef", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], PostersComponent.prototype, "columnData", null);
    PostersComponent = __decorate([
        Component({
            selector: 'app-posters',
            templateUrl: './posters.component.html',
            styleUrls: ['./posters.component.scss'],
            animations: [PosterScale]
        }),
        __metadata("design:paramtypes", [Router,
            Renderer2])
    ], PostersComponent);
    return PostersComponent;
}());
export { PostersComponent };
