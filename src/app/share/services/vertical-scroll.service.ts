import { Injectable } from '@angular/core';
import { UtilService } from './utils.service';
import { EventService } from './event.service';

@Injectable()
export class VerticalScroll {
    private parentRef: Object;
    private contentBoxRef: Object;
    private contentRef: Object;
    private scrollBoxRef: Object;
    private scrollBarRef: Object;
    private oneUnit = 0;
    private scrollRatio = 1;
    private contentMin = 0;
    private scrollMax = 0;
    private isDragging = false;
    private clickClientY = 0;
    private offsetY = 0;

    initializeElement(parent: Object, contentBox: Object, content: Object, scrollBox: Object, scrollBar: Object) {
        this.parentRef = parent;
        this.contentBoxRef = contentBox;
        this.contentRef = content;
        this.scrollBoxRef = scrollBox;
        this.scrollBarRef = scrollBar;
        this.getScrollBarHeight();
        this.bindEvent();
    }

    getScrollBarHeight() {
        this.scrollBarRef['style']['height'] = this.contentBoxRef['clientHeight'] * this.scrollBoxRef['clientHeight'] /
          this.contentRef['clientHeight'] + 'px';
        this.scrollRatio = this.contentRef['clientHeight'] / this.scrollBoxRef['clientHeight'];
        this.oneUnit = this.contentRef['clientHeight'] / 20;
        this.contentMin = this.contentBoxRef['clientHeight'] - this.contentRef['clientHeight'];
        this.scrollMax = this.scrollBoxRef['clientHeight'] - this.scrollBarRef['clientHeight'];
    }

    bindEvent() {
        UtilService.addEvent(this.parentRef, 'mousewheel', this.scrollHandler.bind(this));
        UtilService.addEvent(this.parentRef, 'DOMMouseScroll', this.scrollHandler.bind(this));
        UtilService.addEvent(this.scrollBoxRef, 'click', this.clickHandler.bind(this));
        UtilService.addEvent(this.scrollBarRef, 'mousedown', this.dragHandler.bind(this));
        UtilService.addEvent(document, 'mousemove', this.dragHandler.bind(this));
        UtilService.addEvent(document, 'mouseup', this.dragHandler.bind(this));
    }

    unbindEvent() {
        UtilService.removeEvent(this.parentRef, 'mousewheel', this.scrollHandler.bind(this));
        UtilService.removeEvent(this.parentRef, 'DOMMouseScroll', this.scrollHandler.bind(this));
        UtilService.removeEvent(this.scrollBoxRef, 'click', this.clickHandler.bind(this));
        UtilService.removeEvent(this.scrollBarRef, 'mousedown', this.dragHandler.bind(this));
        UtilService.removeEvent(document, 'mousemove', this.dragHandler.bind(this));
        UtilService.removeEvent(document, 'mouseup', this.dragHandler.bind(this));
    }

    scrollHandler(e: Object) {
        UtilService.preventDefault(e);
        let wheelDelta = this.getWheelDelta(e);
        this.calculateScroll(wheelDelta);
    }

    replacePX(value: string) {
        return Number(value.replace(/px/g, ''));
    }

    getWheelDelta(e: Object) {
        let wheelDelta = 0;
        if (e['wheelDelta']) {
            wheelDelta = e['wheelDelta'];
        } else if (e['detail']) {
            wheelDelta = -40 * e['detail'];
        }
        return wheelDelta;
    }

    calculateScroll(wheelDelta: number) {
        let targetTop = this.getContentTop(wheelDelta);
        this.contentRef['style']['top'] = targetTop + 'px';
        this.scrollBarRef['style']['top'] = -1 * targetTop / this.scrollRatio + 'px';
    }

    getContentTop(wheelDelta: number) {
        let targetTop = 0;
        if (wheelDelta < 0) {
            targetTop = this.replacePX(this.contentRef['style']['top']) - this.oneUnit;
        } else {
            targetTop = this.replacePX(this.contentRef['style']['top']) + this.oneUnit;
        }
        targetTop = this.correctTopValue(targetTop, 'content');
        return targetTop;
    }

    dragHandler(e: Object) {
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
    }

    setTopByDragging(offsetY: number) {
        let curTop = this.replacePX(this.scrollBarRef['style']['top']);
        let targetTop = curTop + offsetY;
        targetTop = this.correctTopValue(targetTop, 'bar');
        this.scrollBarRef['style']['top'] = targetTop + 'px';
        this.contentRef['style']['top'] = -1 * targetTop * this.scrollRatio + 'px';
    }

    clickHandler(e: Object) {
        if (e['target']['className'] === 'scroll-bar') {
            return;
        }
        let targetTop = e['offsetY'] - this.scrollBarRef['clientHeight'] / 2;
        targetTop = this.correctTopValue(targetTop, 'bar');
        this.scrollBarRef['style']['top'] = targetTop + 'px';
        this.contentRef['style']['top'] = -1 * targetTop * this.scrollRatio + 'px';
    }

    correctTopValue(value: number, type: string) {
        if (type === 'content') {
            if (value > 0) {
                value = 0;
            }
            if (value < this.contentMin) {
                value = this.contentMin;
            }
        } else if (type === 'bar') {
            if (value < 0) {
                value = 0;
            }
            if (value > this.scrollMax) {
                value = this.scrollMax;
            }
        }
        return value;
    }
}
