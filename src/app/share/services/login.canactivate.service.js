var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { EventService } from './event.service';
var AppCanActivate = (function () {
    function AppCanActivate() {
    }
    /**
     * function used to decide whether the manage-page of sub profile is accessible.
     */
    AppCanActivate.prototype.canActivate = function () {
        var isProfileLogin = localStorage.getItem('isProfileLogin');
        if (isProfileLogin && isProfileLogin === 'true') {
            return true;
        }
        else {
            var params = {
                type: 'info',
                title: '温馨提示',
                content: '您还未登录或登录已超时'
            };
            EventService.emit('Notify', params);
            return false;
        }
    };
    AppCanActivate = __decorate([
        Injectable()
    ], AppCanActivate);
    return AppCanActivate;
}());
export { AppCanActivate };
