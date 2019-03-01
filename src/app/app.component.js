var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Router } from '@angular/router';
import { EventService } from './share/services/event.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { logout } from './share/services/interface';
var AppComponent = (function () {
    function AppComponent(translate, router, _notification) {
        this.translate = translate;
        this.router = router;
        this._notification = _notification;
        this.title = 'my app';
        this.isTop = true;
        this.showGotoTopButton = false;
        this.isShowLanguageList = false;
        this.gotoTopTimer = null;
        this.curScrollTop = 0;
        this.targetScrollTop = 0;
        this.isHeaderAbsolute = false;
        this.isBigScreen = true;
        this.minScrollTopShowMiniVideo = 835;
        this.goTopDisappearTimer = null;
        this.isShowUserInfo = false;
        this.userName = '';
        this.searchPlaceHolder = '奔跑吧2';
        this.searchContent = '';
        this.initTranslation();
        this.checkClientWidth();
        this.checkNavigationPosition();
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        document.onscroll = this.scrollListener.bind(this);
        document.onkeydown = this.keydownListener.bind(this);
        window.onresize = this.resizeListener.bind(this);
        var isProfileLogin = localStorage.getItem('isProfileLogin');
        if (isProfileLogin && isProfileLogin === 'true') {
            this.isShowUserInfo = true;
            this.userName = localStorage.getItem('User_Name');
        }
        EventService.removeAllListeners(['Login_Succeeded']);
        EventService.on('Login_Succeeded', function () {
            _this.isShowUserInfo = true;
            _this.userName = localStorage.getItem('User_Name');
        });
        EventService.removeAllListeners(['Login_Cookie_Expired']);
        EventService.on('Login_Cookie_Expired', function () {
            _this.isShowUserInfo = false;
            _this.router.navigate(['login']);
        });
        EventService.removeAllListeners(['Notify']);
        EventService.on('Notify', function (data) {
            _this.notify(data);
        });
    };
    AppComponent.prototype.scrollListener = function (e) {
        var _this = this;
        clearTimeout(this.goTopDisappearTimer);
        this.curScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (this.curScrollTop > 0) {
            this.isTop = false;
            if (this.curScrollTop > document.body.clientHeight) {
                this.showGotoTopButton = true;
                this.goTopDisappearTimer = setTimeout(function () {
                    _this.showGotoTopButton = false;
                }, 5000);
            }
            else {
                this.showGotoTopButton = false;
            }
            this.checkMiniVideo();
        }
        else {
            this.showGotoTopButton = false;
            this.isTop = true;
        }
    };
    AppComponent.prototype.keydownListener = function (e) {
        var keyCode = e['keyCode'] ? e['keyCode'] : e['which'];
        switch (keyCode) {
            case 32:
                EventService.emit('SPACE_KEY_EVENT');
                break;
            case 37:
                EventService.emit('LEFT_KEY_EVENT', e);
                break;
            case 38:
                EventService.emit('UP_KEY_EVENT', e);
                break;
            case 39:
                EventService.emit('RIGHT_KEY_EVENT', e);
                break;
            case 40:
                EventService.emit('DOWN_KEY_EVENT', e);
                break;
            default:
                console.log(e);
                break;
        }
    };
    AppComponent.prototype.resizeListener = function () {
        this.checkClientWidth();
        this.checkNavigationPosition();
    };
    AppComponent.prototype.checkMiniVideo = function () {
        if (this.curScrollTop > this.minScrollTopShowMiniVideo) {
            EventService.emit('SHOW_MINI_VIDEO');
        }
        else {
            EventService.emit('HIDE_MINI_VIDEO');
        }
    };
    AppComponent.prototype.checkClientWidth = function () {
        if (document.body.clientWidth < 1440) {
            this.minScrollTopShowMiniVideo = 610;
            if (this.isBigScreen) {
                this.checkMiniVideo();
                EventService.emit('SCREEN_SIZE_CHANGE');
            }
            this.isBigScreen = false;
        }
        else {
            this.minScrollTopShowMiniVideo = 835;
            if (!this.isBigScreen) {
                this.checkMiniVideo();
                EventService.emit('SCREEN_SIZE_CHANGE');
            }
            this.isBigScreen = true;
        }
    };
    AppComponent.prototype.checkNavigationPosition = function () {
        if (document.body.clientWidth < 1100) {
            this.isHeaderAbsolute = true;
        }
        else {
            this.isHeaderAbsolute = false;
        }
    };
    AppComponent.prototype.initTranslation = function () {
        this.translate.setDefaultLang('zh');
        this.translate.use('zh');
    };
    AppComponent.prototype.showLanguageList = function () {
        this.isShowLanguageList = true;
    };
    AppComponent.prototype.hideLanguageList = function () {
        this.isShowLanguageList = false;
    };
    AppComponent.prototype.changeLanguage = function (lang) {
        this.hideLanguageList();
        this.translate.use(lang);
    };
    AppComponent.prototype.gotoTop = function () {
        var _this = this;
        this.targetScrollTop = this.curScrollTop;
        this.gotoTopTimer = setInterval(function () {
            // 每次定时器时间，都向上滚动当前值的15%
            var scrollGap = Math.ceil(_this.curScrollTop * 0.15);
            if (_this.curScrollTop - scrollGap > 0) {
                // 如果自动向上的过程，用户自己滚动了，那么就停止自动向上。这里做一个400的差值，是为了防止一些页面变化的微抖动产生影响。
                if (_this.targetScrollTop < _this.curScrollTop - 400) {
                    clearInterval(_this.gotoTopTimer);
                    return;
                }
                _this.targetScrollTop = _this.curScrollTop - scrollGap;
                document.body.scrollTop = _this.targetScrollTop;
                document.documentElement.scrollTop = _this.targetScrollTop;
            }
            else {
                // 防止scrollTop计算得到负值
                clearInterval(_this.gotoTopTimer);
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
        }, 20);
    };
    AppComponent.prototype.search = function () {
        console.log(this.searchContent);
        this.router.navigate(['search']);
    };
    AppComponent.prototype.notify = function (params) {
        this._notification.create(params.type, params.title, params.content, params.options);
    };
    AppComponent.prototype.userLogout = function () {
        var _this = this;
        var req = {
            name: this.userName
        };
        logout(req).then(function () {
            _this.isShowUserInfo = false;
            localStorage.removeItem('isProfileLogin');
            _this.router.navigate(['login']);
        });
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss'],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [TranslateService,
            Router,
            NzNotificationService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
