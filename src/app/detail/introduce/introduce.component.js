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
var IntroduceComponent = (function () {
    function IntroduceComponent() {
        this.vodIntroduce = '';
    }
    Object.defineProperty(IntroduceComponent.prototype, "introduce", {
        set: function (data) {
            this.vodIntroduce = data;
        },
        enumerable: true,
        configurable: true
    });
    IntroduceComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], IntroduceComponent.prototype, "introduce", null);
    IntroduceComponent = __decorate([
        Component({
            selector: 'app-introduce',
            templateUrl: './introduce.component.html',
            styleUrls: ['./introduce.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], IntroduceComponent);
    return IntroduceComponent;
}());
export { IntroduceComponent };
