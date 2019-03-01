var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { UtilService } from './utils.service';
import { EventService } from './event.service';
var HorizontalScroll = (function () {
    function HorizontalScroll() {
        this.isDragging = false;
        this.clickClientX = 0;
        this.offsetX = 0;
        this.oneUnit = 0;
        this.scrollRatio = 1;
        this.contentMin = 0;
        this.scrollMax = 0;
    }
    HorizontalScroll.prototype.initializeElement = function (contentBox, content, scrollBox, scrollBar) {
        this.contentBoxRef = contentBox;
        this.contentRef = content;
        this.scrollBoxRef = scrollBox;
        this.scrollBarRef = scrollBar;
        this.getScrollBarWidth();
        this.bindEvent();
    };
    HorizontalScroll.prototype.getScrollBarWidth = function () {
        this.scrollBarRef['style'].width = this.contentBoxRef['clientWidth'] * this.scrollBoxRef['clientWidth'] /
            this.contentRef['clientWidth'] + 'px';
        this.scrollRatio = this.contentRef['clientWidth'] / this.scrollBoxRef['clientWidth'];
        this.oneUnit = this.contentRef['clientWidth'] / 20;
        this.contentMin = this.contentBoxRef['clientWidth'] - this.contentRef['clientWidth'];
        this.scrollMax = this.scrollBoxRef['clientWidth'] - this.scrollBarRef['clientWidth'];
    };
    HorizontalScroll.prototype.bindEvent = function () {
        UtilService.addEvent(this.scrollBoxRef, 'click', this.clickHandler.bind(this));
        UtilService.addEvent(this.scrollBarRef, 'mousedown', this.dragHandler.bind(this));
        UtilService.addEvent(document, 'mousemove', this.dragHandler.bind(this));
        UtilService.addEvent(document, 'mouseup', this.dragHandler.bind(this));
    };
    HorizontalScroll.prototype.unbindEvent = function () {
        UtilService.removeEvent(this.scrollBoxRef, 'click', this.clickHandler.bind(this));
        UtilService.removeEvent(this.scrollBarRef, 'mousedown', this.dragHandler.bind(this));
        UtilService.removeEvent(document, 'mousemove', this.dragHandler.bind(this));
        UtilService.removeEvent(document, 'mouseup', this.dragHandler.bind(this));
    };
    HorizontalScroll.prototype.dragHandler = function (e) {
        switch (e['type']) {
            case 'mousedown':
                if (e['target']['className'] !== 'h-scroll-bar') {
                    return;
                }
                this.isDragging = true;
                EventService.emit('SCROLLBAR_DRAG_START');
                this.clickClientX = e['clientX'];
                break;
            case 'mousemove':
                this.offsetX = e['clientX'] - this.clickClientX;
                if (this.isDragging) {
                    this.offsetX = e['clientX'] - this.clickClientX;
                    this.setLeftByDragging(this.offsetX);
                    this.clickClientX = e['clientX'];
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
    HorizontalScroll.prototype.clickHandler = function (e) {
        if (e['target']['className'] === 'h-scroll-bar') {
            return;
        }
        var targetLeft = e['offsetX'] - this.scrollBarRef['clientWidth'] / 2;
        targetLeft = this.correctTopValue(targetLeft, 'bar');
        this.scrollBarRef['style']['left'] = targetLeft + 'px';
        this.contentRef['style']['left'] = -1 * targetLeft * this.scrollRatio + 'px';
    };
    HorizontalScroll.prototype.setLeftByDragging = function (offsetX) {
        var curLeft = this.replacePX(this.scrollBarRef['style']['left']);
        var targetLeft = curLeft + offsetX;
        targetLeft = this.correctTopValue(targetLeft, 'bar');
        this.scrollBarRef['style']['left'] = targetLeft + 'px';
        this.contentRef['style']['left'] = -1 * targetLeft * this.scrollRatio + 'px';
    };
    HorizontalScroll.prototype.replacePX = function (value) {
        return Number(value.replace(/px/g, ''));
    };
    HorizontalScroll.prototype.correctTopValue = function (value, type) {
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
    HorizontalScroll = __decorate([
        Injectable()
    ], HorizontalScroll);
    return HorizontalScroll;
}());
export { HorizontalScroll };
