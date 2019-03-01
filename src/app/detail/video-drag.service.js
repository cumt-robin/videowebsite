var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { UtilService } from '../share/services/utils.service';
import { VideoService } from './video.service';
var NAVIGATION_HEIGHT = 80;
var VideoDragService = (function () {
    function VideoDragService(videoService) {
        this.videoService = videoService;
        this.isCanDrag = false;
        this.isDragging = false;
        this.DraggingObj = null;
        this.rightValue = 0;
        this.bottomValue = 0;
        this.innerOffset = { offsetLeft: 0, offsetTop: 0 };
        this.targetOffset = { offsetLeft: 0, offsetTop: 0 };
        this.hasManualDrag = false;
    }
    VideoDragService.prototype.setIsCanDrag = function (flag) {
        this.isCanDrag = flag;
    };
    VideoDragService.prototype.getIsCanDrag = function () {
        return this.isCanDrag;
    };
    VideoDragService.prototype.getRightValue = function () {
        return this.rightValue;
    };
    VideoDragService.prototype.getBottomValue = function () {
        return this.bottomValue;
    };
    VideoDragService.prototype.getHasManualDrag = function () {
        return this.hasManualDrag;
    };
    VideoDragService.prototype.initDraggingObj = function (element) {
        this.DraggingObj = element;
        this.eventRegister();
    };
    VideoDragService.prototype.destroyElement = function () {
        UtilService.removeEvent(this.DraggingObj, 'mousedown', this.eventHandlers.bind(this));
        UtilService.removeEvent(document, 'mousemove', this.eventHandlers.bind(this));
        UtilService.removeEvent(document, 'mouseup', this.eventHandlers.bind(this));
        this.DraggingObj = null;
        this.isDragging = false;
        this.isCanDrag = false;
        this.hasManualDrag = false;
        this.rightValue = 0;
        this.bottomValue = 0;
        this.innerOffset = { offsetLeft: 0, offsetTop: 0 };
        this.targetOffset = { offsetLeft: 0, offsetTop: 0 };
    };
    VideoDragService.prototype.eventRegister = function () {
        UtilService.addEvent(this.DraggingObj, 'mousedown', this.eventHandlers.bind(this));
        UtilService.addEvent(document, 'mousemove', this.eventHandlers.bind(this));
        UtilService.addEvent(document, 'mouseup', this.eventHandlers.bind(this));
    };
    VideoDragService.prototype.eventHandlers = function (e) {
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
    };
    VideoDragService.prototype.getInnerOffset = function (e) {
        this.innerOffset.offsetLeft = e['clientX'] - this.DraggingObj.offsetLeft;
        this.innerOffset.offsetTop = e['clientY'] - this.DraggingObj.offsetTop;
    };
    VideoDragService.prototype.getTargetOffset = function (e) {
        this.targetOffset.offsetLeft = e['clientX'] - this.innerOffset.offsetLeft;
        this.targetOffset.offsetTop = e['clientY'] - this.innerOffset.offsetTop;
    };
    VideoDragService.prototype.moveElements = function () {
        var clientWidth = window.innerWidth;
        var clientHeight = window.innerHeight;
        if (clientWidth < 1100) {
            NAVIGATION_HEIGHT = 0;
        }
        else {
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
    };
    VideoDragService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [VideoService])
    ], VideoDragService);
    return VideoDragService;
}());
export { VideoDragService };
