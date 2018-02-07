import { Injectable } from '@angular/core';
import { EventService } from '../share/services/event.service';

@Injectable()
export class VideoService {
    private video: HTMLElement = null;
    private isStartPlay = true;
    private isInitCanPlay = true;
    private videoState = '';
    private parentElement: HTMLElement = null;

    initVideoElement(videoRef: HTMLElement, parentRef: HTMLElement) {
        this.video = videoRef;
        this.video['src'] = 'assets/videodemo/mov_bbb.mp4';
        this.parentElement = parentRef;
        console.log('video initialize');
        console.log(this.video);
        console.log('isMuted:', this.isMuted());
        console.log('getVolume:', this.getVolume());
        // this.setPlaybackRate(3);
        console.log('playbackRate:', this.getPlaybackRate());
        this.bindEventListeners();
    }

    destroyVideoElement() {
        console.log('video destroy');
        if (this.video) {
            this.unbindEventListeners();
            this.video['src'] = '';
        }
        this.video = null;
        this.isStartPlay = true;
        this.isInitCanPlay = true;
        this.videoState = '';
    }

    isPaused() {
        return this.video['paused'];
    }

    isPlaying() {
        return !this.video['paused'];
    }

    isMuted() {
        return this.video['muted'];
    }

    isFullScreen() {
        return !!(document.webkitFullscreenElement || document['mozFullScreenElement'] || document['msFullscreenElement']);
    }

    getVolume() {
        return this.video['volume'];
    }

    setVolume(value: number) {
        this.video['volume'] = value;
    }

    getPlaybackRate() {
        return this.video['playbackRate'];
    }

    setPlaybackRate(value: number) {
        console.log('call setPlaybackRate function');
        this.video['playbackRate'] = value;
    }

    getDuration() {
        return Math.floor(this.video['duration']) + '';
    }

    getCurrentTime() {
        return Math.floor(this.video['currentTime']) + '';
    }

    setCurrentTime(value: string) {
        console.log(value);
        this.video['currentTime'] = value;
    }

    getBuffered() {
        return this.video['buffered'];
    }

    getPlayed() {
        return this.video['played'];
    }

    callPlayOrPause() {
        if (this.isPlaying()) {
            this.callPause();
        } else {
            this.callPlay();
        }
    }

    callPlay() {
        console.log('call play function');
        this.video['play']();
    }

    callPause() {
        console.log('call pause function');
        this.video['pause']();
    }

    enterFullScreen() {
        let ua = navigator.userAgent.toLowerCase();
        let isIe = !!ua.match(/msie/i) || !!ua.match(/rv:([\d.]+).*like gecko/);
        let isFirefox = !!ua.match(/firefox\/([\d.]+)/);
        let isEdge = !!ua.match(/edge\/([\d.]+)/);
        if (isIe) {
            this.parentElement['msRequestFullscreen']();
        } else if (isEdge) {
            this.parentElement.webkitRequestFullScreen();
        } else if (isFirefox) {
            this.parentElement['mozRequestFullScreen']();
        } else if (!!ua.match(/version\/([\d.]+).*safari/)) {
            this.parentElement.requestFullscreen();
        } else {
            this.parentElement.webkitRequestFullScreen();
        }
    }

    exitFullScreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document['mozCancelFullScreen']) {
            document['mozCancelFullScreen']();
        } else if (document['msExitFullscreen']) {
            document['msExitFullscreen']();
        } else {
            document.webkitCancelFullScreen();
        }
    }

    bindEventListeners() {
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
        let ua = navigator.userAgent.toLowerCase();
        let isIe = !!ua.match(/msie/i) || !!ua.match(/rv:([\d.]+).*like gecko/);
        let isFirefox = !!ua.match(/firefox\/([\d.]+)/);
        let isEdge = !!ua.match(/edge\/([\d.]+)/);
        if (isIe) {
            document['addEventListener']('MSFullscreenChange', this.vodScreenChange.bind(this));
        } else if (isFirefox) {
            document['addEventListener']('mozfullscreenchange', this.vodScreenChange.bind(this));
        } else if (!!ua.match(/version\/([\d.]+).*safari/)) {
            document['addEventListener']('fullscreenchange', this.vodScreenChange.bind(this));
        } else if (isEdge) {
            document['addEventListener']('webkitfullscreenchange', this.vodScreenChange.bind(this));
        } else {
            document['addEventListener']('webkitfullscreenchange', this.vodScreenChange.bind(this));
        }
    }

    unbindEventListeners() {
        this.video.onplay = null;
        this.video.onplaying = null;
        this.video.oncanplay = null;
        this.video.ontimeupdate = null;
        this.video.onended = null;
    }

    playEvent() {
        console.log('playEvent');
        if (this.isStartPlay) {
            console.log('start play');
            this.isStartPlay = false;
        } else {
            console.log('continue play');
        }
    }

    playingEvent() {
        console.log('playingEvent');
    }

    canplayEvent() {
        console.log('canplayEvent');
        if (this.isInitCanPlay) {
            this.isInitCanPlay = false;
            EventService.emit('VIDEO_INIT_CAN_PLAY');
        }
    }

    timeupdateEvent() {
        // console.log('timeupdateEvent');
        EventService.emit('VIDEO_TIME_UPDATE');
    }

    endedEvent() {
        console.log('endedEvent');
        EventService.emit('VIDEO_END');
    }

    errorEvent(e: Object) {
        console.log(e);
    }

    seekedEvent(e: Object) {
        console.log(e);
    }

    vodScreenChange() {
        EventService.emit('VIDEO_SCREEN_CHANGE', this.isFullScreen());
    }

    getFormatTime(time: string) {
        let h = Math.floor(+time / 3600) + '';
        let m = Math.floor((+time - +h * 3600) / 60) + '';
        let s = Math.floor(+time - +h * 3600 - +m * 60) + '';
        h = +h < 10 ? '0' + h : h;
        m = +m < 10 ? '0' + m : m;
        s = +s < 10 ? '0' + s : s;
        return h + ':' + m + ':' + s;
    }
}
