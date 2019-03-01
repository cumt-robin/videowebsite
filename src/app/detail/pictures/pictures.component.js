var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { FadeInOut } from '../../share/services/animationTrigger';
var PicturesComponent = (function () {
    function PicturesComponent() {
        this.photoList = [];
        this.isShowBigPhoto = false;
        this.curIndex = 0;
        this.state = 'out';
    }
    Object.defineProperty(PicturesComponent.prototype, "stills", {
        set: function (data) {
            this.photoList = data;
        },
        enumerable: true,
        configurable: true
    });
    PicturesComponent.prototype.fadeInOutDone = function (e) {
        if (e['toState'] === 'out') {
            this.isShowBigPhoto = false;
        }
    };
    PicturesComponent.prototype.ngOnInit = function () {
    };
    PicturesComponent.prototype.showBigPhoto = function (i) {
        this.curIndex = i;
        this.isShowBigPhoto = true;
        this.state = 'in';
    };
    PicturesComponent.prototype.hideBigPhoto = function () {
        this.state = 'out';
    };
    PicturesComponent.prototype.clickLeft = function () {
        if (this.curIndex === 0) {
            this.curIndex = this.photoList.length - 1;
        }
        else {
            this.curIndex--;
        }
    };
    PicturesComponent.prototype.clickRight = function () {
        if (this.curIndex === this.photoList.length - 1) {
            this.curIndex = 0;
        }
        else {
            this.curIndex++;
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], PicturesComponent.prototype, "stills", null);
    PicturesComponent = __decorate([
        Component({
            selector: 'app-pictures',
            templateUrl: './pictures.component.html',
            styleUrls: ['./pictures.component.scss'],
            animations: [FadeInOut]
        }),
        __metadata("design:paramtypes", [])
    ], PicturesComponent);
    return PicturesComponent;
}());
export { PicturesComponent };
