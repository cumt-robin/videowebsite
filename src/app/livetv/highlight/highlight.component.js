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
var HighlightComponent = (function () {
    function HighlightComponent() {
        this.keyword = '';
        this.hasStopInput = true;
        this.checkInputTimer = null;
        this.textContent = 'this is an article for test.The system will collect your usage data (such as your browsing history, login/logout records, and viewing history) for refined operations. The system will mine and analyze your preferences based on your usage data. When you browse content recommendation slots or search for content, the system will recommend personalized content based on your preferences, helping you find your favorite content more quickly.this is an article for test.The system will collect your usage data (such as your browsing history, login/logout records, and viewing history) for refined operations. The system will mine and analyze your preferences based on your usage data. When you browse content recommendation slots or search for content, the system will recommend personalized content based on your preferences, helping you find your favorite content more quickly.this is an article for test.The system will collect your usage data (such as your browsing history, login/logout records, and viewing history) for refined operations. The system will mine and analyze your preferences based on your usage data. When you browse content recommendation slots or search for content, the system will recommend personalized content based on your preferences, helping you find your favorite content more quickly.this is an article for test.The system will collect your usage data (such as your browsing history, login/logout records, and viewing history) for refined operations. The system will mine and analyze your preferences based on your usage data. When you browse content recommendation slots or search for content, the system will recommend personalized content based on your preferences, helping you find your favorite content more quickly.this is an article for test.The system will collect your usage data (such as your browsing history, login/logout records, and viewing history) for refined operations. The system will mine and analyze your preferences based on your usage data. When you browse content recommendation slots or search for content, the system will recommend personalized content based on your preferences, helping you find your favorite content more quickly.this is an article for test.The system will collect your usage data (such as your browsing history, login/logout records, and viewing history) for refined operations. The system will mine and analyze your preferences based on your usage data. When you browse content recommendation slots or search for content, the system will recommend personalized content based on your preferences, helping you find your favorite content more quickly.';
        this.innerHTML = this.textContent;
    }
    HighlightComponent.prototype.ngOnInit = function () {
    };
    HighlightComponent.prototype.inputKeydown = function (e) {
        clearTimeout(this.checkInputTimer);
        this.hasStopInput = false;
    };
    HighlightComponent.prototype.inputKeyup = function (e) {
        var _this = this;
        this.keyword = e.target.value;
        clearTimeout(this.checkInputTimer);
        this.checkInputTimer = setTimeout(function () {
            _this.hasStopInput = true;
            _this.doHighLight();
        }, 500);
    };
    HighlightComponent.prototype.doHighLight = function () {
        if (this.textContent.includes(this.keyword) && this.keyword !== '') {
            var textArray = this.textContent.split(this.keyword);
            this.innerHTML = this.getNewInnerHTML(textArray);
        }
        else {
            this.innerHTML = this.textContent;
        }
    };
    HighlightComponent.prototype.getNewInnerHTML = function (textArray) {
        var result = '';
        for (var i = 0, length_1 = textArray.length; i < length_1; i++) {
            result += textArray[i];
            if (i !== length_1 - 1) {
                result += '<span style="color:#FCCB35">' + this.keyword + '</span>';
            }
        }
        return result;
    };
    HighlightComponent = __decorate([
        Component({
            selector: 'app-highlight',
            templateUrl: './highlight.component.html',
            styleUrls: ['./highlight.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], HighlightComponent);
    return HighlightComponent;
}());
export { HighlightComponent };
