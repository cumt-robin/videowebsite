import { Injectable } from '@angular/core';
import { EventService } from '../share/services/event.service';
import { UtilService } from '../share/services/utils.service';
import { VideoService } from './video.service';

let NAVIGATION_HEIGHT = 80;

@Injectable()
export class VideoDragService {
    private isCanDrag = false;
    private isDragging = false;
    private DraggingObj: HTMLElement = null;
    private rightValue = 0;
    private bottomValue = 0;
    private innerOffset = {offsetLeft: 0, offsetTop: 0};
    private targetOffset = {offsetLeft: 0, offsetTop: 0};
    private hasManualDrag = false;

    constructor(private videoService: VideoService) {

    }

    setIsCanDrag(flag: boolean) {
        this.isCanDrag = flag;
    }

    getIsCanDrag() {
        return this.isCanDrag;
    }

    getRightValue() {
        return this.rightValue;
    }

    getBottomValue() {
        return this.bottomValue;
    }

    getHasManualDrag() {
        return this.hasManualDrag;
    }

    initDraggingObj(element: HTMLElement) {
        this.DraggingObj = element;
        this.eventRegister();
    }

    destroyElement() {
        UtilService.removeEvent(this.DraggingObj, 'mousedown', this.eventHandlers.bind(this));
        UtilService.removeEvent(document, 'mousemove', this.eventHandlers.bind(this));
        UtilService.removeEvent(document, 'mouseup', this.eventHandlers.bind(this));
        this.DraggingObj = null;
        this.isDragging = false;
        this.isCanDrag = false;
        this.hasManualDrag = false;
        this.rightValue = 0;
        this.bottomValue = 0;
        this.innerOffset = {offsetLeft: 0, offsetTop: 0};
        this.targetOffset = {offsetLeft: 0, offsetTop: 0};
    }

    eventRegister() {
        UtilService.addEvent(this.DraggingObj, 'mousedown', this.eventHandlers.bind(this));
        UtilService.addEvent(document, 'mousemove', this.eventHandlers.bind(this));
        UtilService.addEvent(document, 'mouseup', this.eventHandlers.bind(this));
    }

    eventHandlers(e: Object) {
        switch (e['type']) {
            case 'mousedown':
                if (this.isCanDrag && !this.videoService.isFullScreen()) {
                    this.isDragging = true;
                    this.getInnerOffset(e);
                }
                break;
            case 'mousemove':
                if (this.isCanDrag && this.isDragging && !this.videoService.isFullScreen()) {
                    if ('movementX' in e && 'movementY' in e && Number(e['movementX']) === 0 && Number(e['movementY']) === 0) {
                        return;
                    }
                    this.getTargetOffset(e);
                    this.moveElements();
                    this.hasManualDrag = true;
                }
                break;
            case 'mouseup':
                this.isDragging = false;
                break;
            default:
                break;
        }
    }

    getInnerOffset(e: Object) {
        this.innerOffset.offsetLeft = e['clientX'] - this.DraggingObj.offsetLeft;
        this.innerOffset.offsetTop = e['clientY'] - this.DraggingObj.offsetTop;
    }

    getTargetOffset(e: Object) {
        this.targetOffset.offsetLeft = e['clientX'] - this.innerOffset.offsetLeft;
        this.targetOffset.offsetTop = e['clientY'] - this.innerOffset.offsetTop;
    }

    moveElements() {
        let clientWidth = window.innerWidth;
        let clientHeight = window.innerHeight;
        if (clientWidth < 1100) {
            NAVIGATION_HEIGHT = 0;
        } else {
            NAVIGATION_HEIGHT = 80;
        }
        this.rightValue = clientWidth - this.targetOffset.offsetLeft - 460;
        this.bottomValue = clientHeight - this.targetOffset.offsetTop - 260;
        if (this.rightValue < 0) {
            this.rightValue = 0;
        }
        if (this.bottomValue < 0) {
            this.bottomValue = 0;
        }
        if (this.rightValue > clientWidth - 460) {
            this.rightValue = clientWidth - 460;
        }
        if (this.bottomValue > clientHeight - 260 - NAVIGATION_HEIGHT) {
            this.bottomValue = clientHeight - 260 - NAVIGATION_HEIGHT;
        }
        this.DraggingObj['style']['right'] = this.rightValue + 'px';
        this.DraggingObj['style']['bottom'] = this.bottomValue + 'px';
    }
}
