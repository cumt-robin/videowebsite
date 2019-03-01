var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getVodHomeData } from '../share/services/interface';
var OndemandComponent = (function () {
    function OndemandComponent(router) {
        this.router = router;
        this.bannerList = [];
    }
    OndemandComponent.prototype.ngOnInit = function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.queryVODHomeData();
    };
    OndemandComponent.prototype.queryVODHomeData = function () {
        var _this = this;
        getVodHomeData().then(function (resp) {
            _this.bannerList = resp.vodBanner;
        });
    };
    OndemandComponent.prototype.gotoVODDetail = function (i) {
        var vod = this.bannerList[i];
        sessionStorage.setItem('VOD_DETAIL_PAGE_BACKGROUND_URL', vod.url);
        this.router.navigate(['detail', vod.id]);
    };
    OndemandComponent = __decorate([
        Component({
            selector: 'app-ondemand',
            templateUrl: './ondemand.component.html',
            styleUrls: ['./ondemand.component.scss']
        }),
        __metadata("design:paramtypes", [Router])
    ], OndemandComponent);
    return OndemandComponent;
}());
export { OndemandComponent };
