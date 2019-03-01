var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { EventService } from '../share/services/event.service';
var VideoService = (function () {
    function VideoService() {
        this.video = null;
        this.isStartPlay = true;
        this.isInitCanPlay = true;
        this.videoState = '';
        this.parentElement = null;
    }
    VideoService.prototype.initVideoElement = function (videoRef, parentRef, playUrl) {
        this.video = videoRef;
        this.video['src'] = playUrl;
        this.parentElement = parentRef;
        console.log('video initialize');
        console.log(this.video);
        console.log('isMuted:', this.isMuted());
        console.log('getVolume:', this.getVolume());
        // this.setPlaybackRate(3);
        console.log('playbackRate:', this.getPlaybackRate());
        this.bindEventListeners();
    };
    VideoService.prototype.destroyVideoElement = function () {
        console.log('video destroy');
        if (this.video) {
            this.unbindEventListeners();
            this.video['src'] = '';
        }
        this.video = null;
        this.isStartPlay = true;
        this.isInitCanPlay = true;
        this.videoState = '';
    };
    VideoService.prototype.isPaused = function () {
        return this.video['paused'];
    };
    VideoService.prototype.isPlaying = function () {
        return !this.video['paused'];
    };
    VideoService.prototype.isMuted = function () {
        return this.video['muted'];
    };
    VideoService.prototype.isFullScreen = function () {
        return !!(document.webkitFullscreenElement || document['mozFullScreenElement'] || document['msFullscreenElement']);
    };
    VideoService.prototype.getVolume = function () {
        return this.video['volume'];
    };
    VideoService.prototype.setVolume = function (value) {
        this.video['volume'] = value;
    };
    VideoService.prototype.getPlaybackRate = function () {
        return this.video['playbackRate'];
    };
    VideoService.prototype.setPlaybackRate = function (value) {
        console.log('call setPlaybackRate function');
        this.video['playbackRate'] = value;
    };
    VideoService.prototype.getDuration = function () {
        return Math.floor(this.video['duration']) + '';
    };
    VideoService.prototype.getCurrentTime = function () {
        return Math.floor(this.video['currentTime']) + '';
    };
    VideoService.prototype.setCurrentTime = function (value) {
        console.log(value);
        this.video['currentTime'] = value;
    };
    VideoService.prototype.getBuffered = function () {
        return this.video['buffered'];
    };
    VideoService.prototype.getPlayed = function () {
        return this.video['played'];
    };
    VideoService.prototype.callPlayOrPause = function () {
        if (this.isPlaying()) {
            this.callPause();
        }
        else {
            this.callPlay();
        }
    };
    VideoService.prototype.callPlay = function () {
        console.log('call play function');
        this.video['play']();
    };
    VideoService.prototype.callPause = function () {
        console.log('call pause function');
        this.video['pause']();
    };
    VideoService.prototype.enterFullScreen = function () {
        var ua = navigator.userAgent.toLowerCase();
        var isIe = !!ua.match(/msie/i) || !!ua.match(/rv:([\d.]+).*like gecko/);
        var isFirefox = !!ua.match(/firefox\/([\d.]+)/);
        var isEdge = !!ua.match(/edge\/([\d.]+)/);
        if (isIe) {
            this.parentElement['msRequestFullscreen']();
        }
        else if (isEdge) {
            this.parentElement.webkitRequestFullScreen();
        }
        else if (isFirefox) {
            this.parentElement['mozRequestFullScreen']();
        }
        else if (!!ua.match(/version\/([\d.]+).*safari/)) {
            this.parentElement.requestFullscreen();
        }
        else {
            this.parentElement.webkitRequestFullScreen();
        }
    };
    VideoService.prototype.exitFullScreen = function () {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document['mozCancelFullScreen']) {
            document['mozCancelFullScreen']();
        }
        else if (document['msExitFullscreen']) {
            document['msExitFullscreen']();
        }
        else {
            document.webkitCancelFullScreen();
        }
    };
    VideoService.prototype.bindEventListeners = function () {
        // 开始播放或者暂停后继续播放
        this.video.onplay = this.playEvent.bind(this);
        // 当音频/视频在已因缓冲而暂停或停止后已就绪时
        this.video.onplaying = this.playingEvent.bind(this);
        // 当视频可播放时
        this.video.oncanplay = this.canplayEvent.bind(this);
        // 视频当前时间更新时
        this.video.ontimeupdate = this.timeupdateEvent.bind(this);
        this.video.onerror = this.errorEvent.bind(this);
        // 视频播放结束时
        this.video.onended = this.endedEvent.bind(this);
        this.video.onseeked = this.seekedEvent.bind(this);
        var ua = navigator.userAgent.toLowerCase();
        var isIe = !!ua.match(/msie/i) || !!ua.match(/rv:([\d.]+).*like gecko/);
        var isFirefox = !!ua.match(/firefox\/([\d.]+)/);
        var isEdge = !!ua.match(/edge\/([\d.]+)/);
        if (isIe) {
            document['addEventListener']('MSFullscreenChange', this.vodScreenChange.bind(this));
        }
        else if (isFirefox) {
            document['addEventListener']('mozfullscreenchange', this.vodScreenChange.bind(this));
        }
        else if (!!ua.match(/version\/([\d.]+).*safari/)) {
            document['addEventListener']('fullscreenchange', this.vodScreenChange.bind(this));
        }
        else if (isEdge) {
            document['addEventListener']('webkitfullscreenchange', this.vodScreenChange.bind(this));
        }
        else {
            document['addEventListener']('webkitfullscreenchange', this.vodScreenChange.bind(this));
        }
    };
    VideoService.prototype.unbindEventListeners = function () {
        this.video.onplay = null;
        this.video.onplaying = null;
        this.video.oncanplay = null;
        this.video.ontimeupdate = null;
        this.video.onended = null;
    };
    VideoService.prototype.playEvent = function () {
        console.log('playEvent');
        if (this.isStartPlay) {
            console.log('start play');
            this.isStartPlay = false;
        }
        else {
            console.log('continue play');
        }
    };
    VideoService.prototype.playingEvent = function () {
        console.log('playingEvent');
    };
    VideoService.prototype.canplayEvent = function () {
        console.log('canplayEvent');
        if (this.isInitCanPlay) {
            this.isInitCanPlay = false;
            EventService.emit('VIDEO_INIT_CAN_PLAY');
        }
    };
    VideoService.prototype.timeupdateEvent = function () {
        // console.log('timeupdateEvent');
        EventService.emit('VIDEO_TIME_UPDATE');
    };
    VideoService.prototype.endedEvent = function () {
        console.log('endedEvent');
        EventService.emit('VIDEO_END');
    };
    VideoService.prototype.errorEvent = function (e) {
        console.log(e);
    };
    VideoService.prototype.seekedEvent = function (e) {
        console.log(e);
    };
    VideoService.prototype.vodScreenChange = function () {
        EventService.emit('VIDEO_SCREEN_CHANGE', this.isFullScreen());
    };
    VideoService.prototype.getFormatTime = function (time) {
        var h = Math.floor(+time / 3600) + '';
        var m = Math.floor((+time - +h * 3600) / 60) + '';
        var s = Math.floor(+time - +h * 3600 - +m * 60) + '';
        h = +h < 10 ? '0' + h : h;
        m = +m < 10 ? '0' + m : m;
        s = +s < 10 ? '0' + s : s;
        return h + ':' + m + ':' + s;
    };
    VideoService = __decorate([
        Injectable()
    ], VideoService);
    return VideoService;
}());
export { VideoService };
