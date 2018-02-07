import { Injectable } from '@angular/core';
import { UtilService } from './utils.service';
import { EventService } from './event.service';

@Injectable()
export class HorizontalScroll {

    private contentBoxRef: Object;
    private contentRef: Object;
    private scrollBoxRef: Object;
    private scrollBarRef: Object;
    private isDragging = false;
    private clickClientX = 0;
    private offsetX = 0;
    private oneUnit = 0;
    private scrollRatio = 1;
    private contentMin = 0;
    private scrollMax = 0;

    initializeElement(contentBox: Object, content: Object, scrollBox: Object, scrollBar: Object) {
        this.contentBoxRef = contentBox;
        this.contentRef = content;
        this.scrollBoxRef = scrollBox;
        this.scrollBarRef = scrollBar;
        this.getScrollBarWidth();
        this.bindEvent();
    }

    getScrollBarWidth() {
        this.scrollBarRef['style'].width = this.contentBoxRef['clientWidth'] * this.scrollBoxRef['clientWidth'] /
          this.contentRef['clientWidth'] + 'px';
        this.scrollRatio = this.contentRef['clientWidth'] / this.scrollBoxRef['clientWidth'];
        this.oneUnit = this.contentRef['clientWidth'] / 20;
        this.contentMin = this.contentBoxRef['clientWidth'] - this.contentRef['clientWidth'];
        this.scrollMax = this.scrollBoxRef['clientWidth'] - this.scrollBarRef['clientWidth'];
    }

    bindEvent() {
        UtilService.addEvent(this.scrollBoxRef, 'click', this.clickHandler.bind(this));
        UtilService.addEvent(this.scrollBarRef, 'mousedown', this.dragHandler.bind(this));
        UtilService.addEvent(document, 'mousemove', this.dragHandler.bind(this));
        UtilService.addEvent(document, 'mouseup', this.dragHandler.bind(this));
    }

    unbindEvent() {
        UtilService.removeEvent(this.scrollBoxRef, 'click', this.clickHandler.bind(this));
        UtilService.removeEvent(this.scrollBarRef, 'mousedown', this.dragHandler.bind(this));
        UtilService.removeEvent(document, 'mousemove', this.dragHandler.bind(this));
        UtilService.removeEvent(document, 'mouseup', this.dragHandler.bind(this));
    }

    dragHandler(e: Object) {
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
    }

    clickHandler(e: Object) {
        if (e['target']['className'] === 'h-scroll-bar') {
            return;
        }
        let targetLeft = e['offsetX'] - this.scrollBarRef['clientWidth'] / 2;
        targetLeft = this.correctTopValue(targetLeft, 'bar');
        this.scrollBarRef['style']['left'] = targetLeft + 'px';
        this.contentRef['style']['left'] = -1 * targetLeft * this.scrollRatio + 'px';
    }

    setLeftByDragging(offsetX: number) {
        let curLeft = this.replacePX(this.scrollBarRef['style']['left']);
        let targetLeft = curLeft + offsetX;
        targetLeft = this.correctTopValue(targetLeft, 'bar');
        this.scrollBarRef['style']['left'] = targetLeft + 'px';
        this.contentRef['style']['left'] = -1 * targetLeft * this.scrollRatio + 'px';
    }

    replacePX(value: string) {
        return Number(value.replace(/px/g, ''));
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
