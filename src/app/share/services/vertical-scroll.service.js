var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { UtilService } from './utils.service';
import { EventService } from './event.service';
var VerticalScroll = (function () {
    function VerticalScroll() {
        this.oneUnit = 0;
        this.scrollRatio = 1;
        this.contentMin = 0;
        this.scrollMax = 0;
        this.isDragging = false;
        this.clickClientY = 0;
        this.offsetY = 0;
    }
    VerticalScroll.prototype.initializeElement = function (parent, contentBox, content, scrollBox, scrollBar) {
        this.parentRef = parent;
        this.contentBoxRef = contentBox;
        this.contentRef = content;
        this.scrollBoxRef = scrollBox;
        this.scrollBarRef = scrollBar;
        this.getScrollBarHeight();
        this.bindEvent();
    };
    VerticalScroll.prototype.getScrollBarHeight = function () {
        this.scrollBarRef['style']['height'] = this.contentBoxRef['clientHeight'] * this.scrollBoxRef['clientHeight'] /
            this.contentRef['clientHeight'] + 'px';
        this.scrollRatio = this.contentRef['clientHeight'] / this.scrollBoxRef['clientHeight'];
        this.oneUnit = this.contentRef['clientHeight'] / 20;
        this.contentMin = this.contentBoxRef['clientHeight'] - this.contentRef['clientHeight'];
        this.scrollMax = this.scrollBoxRef['clientHeight'] - this.scrollBarRef['clientHeight'];
    };
    VerticalScroll.prototype.bindEvent = function () {
        UtilService.addEvent(this.parentRef, 'mousewheel', this.scrollHandler.bind(this));
        UtilService.addEvent(this.parentRef, 'DOMMouseScroll', this.scrollHandler.bind(this));
        UtilService.addEvent(this.scrollBoxRef, 'click', this.clickHandler.bind(this));
        UtilService.addEvent(this.scrollBarRef, 'mousedown', this.dragHandler.bind(this));
        UtilService.addEvent(document, 'mousemove', this.dragHandler.bind(this));
        UtilService.addEvent(document, 'mouseup', this.dragHandler.bind(this));
    };
    VerticalScroll.prototype.unbindEvent = function () {
        UtilService.removeEvent(this.parentRef, 'mousewheel', this.scrollHandler.bind(this));
        UtilService.removeEvent(this.parentRef, 'DOMMouseScroll', this.scrollHandler.bind(this));
        UtilService.removeEvent(this.scrollBoxRef, 'click', this.clickHandler.bind(this));
        UtilService.removeEvent(this.scrollBarRef, 'mousedown', this.dragHandler.bind(this));
        UtilService.removeEvent(document, 'mousemove', this.dragHandler.bind(this));
        UtilService.removeEvent(document, 'mouseup', this.dragHandler.bind(this));
    };
    VerticalScroll.prototype.scrollHandler = function (e) {
        UtilService.preventDefault(e);
        var wheelDelta = this.getWheelDelta(e);
        this.calculateScroll(wheelDelta);
    };
    VerticalScroll.prototype.replacePX = function (value) {
        return Number(value.replace(/px/g, ''));
    };
    VerticalScroll.prototype.getWheelDelta = function (e) {
        var wheelDelta = 0;
        if (e['wheelDelta']) {
            wheelDelta = e['wheelDelta'];
        }
        else if (e['detail']) {
            wheelDelta = -40 * e['detail'];
        }
        return wheelDelta;
    };
    VerticalScroll.prototype.calculateScroll = function (wheelDelta) {
        var targetTop = this.getContentTop(wheelDelta);
        this.contentRef['style']['top'] = targetTop + 'px';
        this.scrollBarRef['style']['top'] = -1 * targetTop / this.scrollRatio + 'px';
    };
    VerticalScroll.prototype.getContentTop = function (wheelDelta) {
        var targetTop = 0;
        if (wheelDelta < 0) {
            targetTop = this.replacePX(this.contentRef['style']['top']) - this.oneUnit;
        }
        else {
            targetTop = this.replacePX(this.contentRef['style']['top']) + this.oneUnit;
        }
        targetTop = this.correctTopValue(targetTop, 'content');
        return targetTop;
    };
    VerticalScroll.prototype.dragHandler = function (e) {
        switch (e['type']) {
            case 'mousedown':
                if (e['target']['className'] !== 'scroll-bar') {
                    return;
                }
                this.isDragging = true;
                EventService.emit('SCROLLBAR_DRAG_START');
                this.clickClientY = e['clientY'];
                break;
            case 'mousemove':
                this.offsetY = e['clientY'] - this.clickClientY;
                if (this.isDragging) {
                    this.offsetY = e['clientY'] - this.clickClientY;
                    this.setTopByDragging(this.offsetY);
                    this.clickClientY = e['clientY'];
                }
                break;
            case 'mouseup':
                this.isDragging = false;
                EventService.emit('SCROLLBAR_DRAG_END');
                break;
            default:
                break;
        }
    };
    VerticalScroll.prototype.setTopByDragging = function (offsetY) {
        var curTop = this.replacePX(this.scrollBarRef['style']['top']);
        var targetTop = curTop + offsetY;
        targetTop = this.correctTopValue(targetTop, 'bar');
        this.scrollBarRef['style']['top'] = targetTop + 'px';
        this.contentRef['style']['top'] = -1 * targetTop * this.scrollRatio + 'px';
    };
    VerticalScroll.prototype.clickHandler = function (e) {
        if (e['target']['className'] === 'scroll-bar') {
            return;
        }
        var targetTop = e['offsetY'] - this.scrollBarRef['clientHeight'] / 2;
        targetTop = this.correctTopValue(targetTop, 'bar');
        this.scrollBarRef['style']['top'] = targetTop + 'px';
        this.contentRef['style']['top'] = -1 * targetTop * this.scrollRatio + 'px';
    };
    VerticalScroll.prototype.correctTopValue = function (value, type) {
        if (type === 'content') {
            if (value > 0) {
                value = 0;
            }
            if (value < this.contentMin) {
                value = this.contentMin;
            }
        }
        else if (type === 'bar') {
            if (value < 0) {
                value = 0;
            }
            if (value > this.scrollMax) {
                value = this.scrollMax;
            }
        }
        return value;
    };
    VerticalScroll = __decorate([
        Injectable()
    ], VerticalScroll);
    return VerticalScroll;
}());
export { VerticalScroll };
