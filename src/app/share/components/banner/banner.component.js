var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
var BannerComponent = (function () {
    function BannerComponent() {
        this.banners = [];
        this.clickBanner = new EventEmitter();
    }
    Object.defineProperty(BannerComponent.prototype, "bannerData", {
        set: function (data) {
            this.banners = data;
        },
        enumerable: true,
        configurable: true
    });
    BannerComponent.prototype.ngOnInit = function () {
    };
    BannerComponent.prototype.gotoDetailPage = function (i) {
        this.clickBanner.emit(i);
    };
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], BannerComponent.prototype, "bannerData", null);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], BannerComponent.prototype, "clickBanner", void 0);
    BannerComponent = __decorate([
        Component({
            selector: 'app-banner',
            templateUrl: './banner.component.html',
            styleUrls: ['./banner.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], BannerComponent);
    return BannerComponent;
}());
export { BannerComponent };
