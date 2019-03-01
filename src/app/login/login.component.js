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
import { login } from '../share/services/interface';
import { EventService } from '../share/services/event.service';
import { NzNotificationService } from 'ng-zorro-antd';
var LoginComponent = (function () {
    function LoginComponent(router, _notification) {
        this.router = router;
        this._notification = _notification;
        this.username = '';
        this.password = '';
        this.showErrorInfo = false;
        var isLogin = localStorage.getItem('isProfileLogin');
        if (isLogin && isLogin === 'true') {
            this.router.navigate(['home']);
        }
    }
    LoginComponent.prototype.ngOnInit = function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        var params = {
            type: 'info',
            title: '温馨提示',
            content: '请使用测试账号登录，账号test，密码0',
            options: {
                duration: 10000
            }
        };
        EventService.emit('Notify', params);
    };
    LoginComponent.prototype.doLogin = function () {
        var _this = this;
        var req = {
            name: this.username,
            password: this.password
        };
        login(req).then(function (resp) {
            _this.showErrorInfo = false;
            _this.router.navigate(['home']);
            localStorage.setItem('isProfileLogin', 'true');
            localStorage.setItem('User_Name', _this.username);
            EventService.emit('Login_Succeeded');
        }, function (resp) {
            _this.showErrorInfo = true;
        });
    };
    LoginComponent = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        }),
        __metadata("design:paramtypes", [Router,
            NzNotificationService])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
