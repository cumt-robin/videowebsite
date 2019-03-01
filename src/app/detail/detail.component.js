var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from './video.service';
import { VideoDragService } from './video-drag.service';
import { EventService } from '../share/services/event.service';
import { UtilService } from '../share/services/utils.service';
import { getVODDetail } from '../share/services/interface';
var DetailComponent = (function () {
    function DetailComponent(route, videoService, videoDragService) {
        this.route = route;
        this.videoService = videoService;
        this.videoDragService = videoDragService;
        this.volumeBeforeMute = 0;
        this.duration = '100';
        this.currentTime = '0';
        this.currentShowTime = '00:00:00';
        this.currentShowDuration = '00:00:00';
        this.isPlayEnd = false;
        this.isFullScreen = false;
        this.playbuttonState = 'anticon-pause-circle-o';
        this.fullScreenState = 'anticon-arrows-alt';
        this.isShowMiniVideo = false;
        this.isManualCloseMini = false;
        this.backImgUrl = 'assets/image/p1.jpg';
        this.coverImgUrl = 'assets/image/detailcover.png';
        this.isLoading = true;
        this.previewList = [];
        this.previewBackgrounds = [];
        this.oneWidth = 160;
        this.bigWidth = 200;
        this.margin = 2;
        this.showPreviewList = false;
        this.curIndex = 0;
        this.vodID = '';
        this.showVolumeBar = false;
    }
    DetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.backImgUrl = sessionStorage.getItem('VOD_DETAIL_PAGE_BACKGROUND_URL');
            _this.vodID = params['id'];
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            _this.resetProperties();
            _this.videoService.destroyVideoElement();
            getVODDetail({ id: _this.vodID }).then(function (resp) {
                _this.vodData = resp['vod'];
                _this.recmColumns = resp['recomendColumns'];
                _this.previewList = _this.vodData['previews'];
                _this.calculateListWidth();
                _this.getPreviewBackgrounds();
                _this.videoService.initVideoElement(_this.video.nativeElement, _this.videoParent.nativeElement, _this.vodData.playUrl);
                _this.videoDragService.initDraggingObj(_this.videoParent.nativeElement);
            });
            EventService.removeAllListeners(['SCREEN_SIZE_CHANGE']);
            EventService.on('SCREEN_SIZE_CHANGE', function (e) {
                if (_this.isShowMiniVideo) {
                    _this.videoDragService.moveElements();
                }
            });
            EventService.removeAllListeners(['LEFT_KEY_EVENT']);
            EventService.on('LEFT_KEY_EVENT', function (e) {
                _this.backwardHandler(e);
            });
            EventService.removeAllListeners(['RIGHT_KEY_EVENT']);
            EventService.on('RIGHT_KEY_EVENT', function (e) {
                _this.forwardHandler(e);
            });
            EventService.removeAllListeners(['VIDEO_INIT_CAN_PLAY']);
            EventService.on('VIDEO_INIT_CAN_PLAY', function () {
                _this.videoReadyToPlay();
            });
            EventService.removeAllListeners(['VIDEO_TIME_UPDATE']);
            EventService.on('VIDEO_TIME_UPDATE', function () {
                _this.videoTimeUpdate();
            });
            EventService.removeAllListeners(['VIDEO_END']);
            EventService.on('VIDEO_END', function () {
                _this.videoPlayEnd();
            });
            EventService.removeAllListeners(['VIDEO_SCREEN_CHANGE']);
            EventService.on('VIDEO_SCREEN_CHANGE', function (flag) {
                _this.isFullScreen = flag;
                if (_this.isFullScreen) {
                    _this.fullScreenState = 'anticon-shrink';
                }
                else {
                    _this.fullScreenState = 'anticon-arrows-alt';
                }
            });
            EventService.removeAllListeners(['SHOW_MINI_VIDEO']);
            EventService.on('SHOW_MINI_VIDEO', function () {
                if (!_this.isManualCloseMini) {
                    _this.isShowMiniVideo = true;
                    _this.videoDragService.setIsCanDrag(true);
                    if (_this.videoDragService.getHasManualDrag()) {
                        _this.miniStyleAfterShow();
                    }
                }
            });
            EventService.removeAllListeners(['HIDE_MINI_VIDEO']);
            EventService.on('HIDE_MINI_VIDEO', function () {
                _this.isManualCloseMini = false;
                _this.isShowMiniVideo = false;
                _this.videoDragService.setIsCanDrag(false);
                _this.miniStyleAfterDisappear();
            });
            EventService.removeAllListeners(['SPACE_KEY_EVENT']);
            EventService.on('SPACE_KEY_EVENT', function () {
                _this.spaceControlPlay();
            });
        });
    };
    DetailComponent.prototype.ngOnDestroy = function () {
        this.videoService.destroyVideoElement();
        this.videoDragService.destroyElement();
    };
    DetailComponent.prototype.ngAfterViewInit = function () {
        document.querySelector('video').oncontextmenu = function () {
            return false;
        };
    };
    DetailComponent.prototype.resetProperties = function () {
        this.isShowMiniVideo = false;
        this.videoDragService.setIsCanDrag(false);
        this.miniStyleAfterDisappear();
        this.isLoading = true;
        this.isPlayEnd = false;
    };
    DetailComponent.prototype.videoReadyToPlay = function () {
        this.isLoading = false;
        this.isPlayEnd = false;
        this.duration = this.videoService.getDuration();
        this.currentShowDuration = this.videoService.getFormatTime(this.duration);
    };
    DetailComponent.prototype.videoTimeUpdate = function () {
        this.currentTime = this.videoService.getCurrentTime();
        this.currentShowTime = this.videoService.getFormatTime(this.currentTime);
    };
    DetailComponent.prototype.videoPlayEnd = function () {
        this.isPlayEnd = true;
        this.playbuttonState = 'anticon-reload';
    };
    DetailComponent.prototype.spaceControlPlay = function () {
        if (this.videoService.isFullScreen()) {
            this.playOrPause();
        }
    };
    DetailComponent.prototype.playOrPause = function () {
        if (this.isPlayEnd) {
            this.isPlayEnd = false;
        }
        this.videoService.callPlayOrPause();
        if (this.videoService.isPlaying()) {
            this.playbuttonState = 'anticon-pause-circle-o';
        }
        else {
            this.playbuttonState = 'anticon-play-circle-o';
        }
    };
    DetailComponent.prototype.backwardHandler = function (e) {
        if (this.videoService.isFullScreen() && !this.isPlayEnd) {
            UtilService.preventDefault(e);
            var seekTime = +this.progressBar.nativeElement.value - 5;
            if (seekTime < 0) {
                seekTime = 0;
            }
            this.videoService.setCurrentTime(seekTime + '');
            this.checkContinuePlay();
        }
    };
    DetailComponent.prototype.forwardHandler = function (e) {
        if (this.videoService.isFullScreen() && !this.isPlayEnd) {
            UtilService.preventDefault(e);
            var seekTime = +this.progressBar.nativeElement.value + 5;
            if (seekTime > +this.duration) {
                seekTime = +this.duration;
            }
            this.videoService.setCurrentTime(seekTime + '');
            this.checkContinuePlay();
        }
    };
    DetailComponent.prototype.checkContinuePlay = function () {
        if (this.videoService.isPaused()) {
            this.videoService.callPlay();
            this.playbuttonState = 'anticon-pause-circle-o';
        }
    };
    DetailComponent.prototype.progressChange = function (e) {
        this.videoService.setCurrentTime(this.progressBar.nativeElement.value);
    };
    DetailComponent.prototype.volumeChange = function (e) {
        this.videoService.setVolume(+this.volumeBar.nativeElement.value / 100);
    };
    DetailComponent.prototype.fullScreenControl = function () {
        if (this.videoService.isFullScreen()) {
            this.videoService.exitFullScreen();
            if (this.videoDragService.getIsCanDrag() && this.videoDragService.getHasManualDrag()) {
                this.miniStyleAfterShow();
            }
        }
        else {
            this.videoService.enterFullScreen();
            if (this.videoDragService.getIsCanDrag()) {
                this.miniStyleAfterDisappear();
            }
        }
    };
    DetailComponent.prototype.setMuted = function () {
        if (+this.volumeBar.nativeElement.value !== 0) {
            this.volumeBeforeMute = +this.volumeBar.nativeElement.value;
            this.volumeBar.nativeElement.value = '0';
            this.videoService.setVolume(0);
        }
        else {
            this.volumeBar.nativeElement.value = this.volumeBeforeMute + '';
            this.videoService.setVolume(this.volumeBeforeMute / 100);
        }
    };
    DetailComponent.prototype.toggleVolume = function (flag) {
        this.showVolumeBar = flag;
    };
    DetailComponent.prototype.closeMini = function () {
        this.isManualCloseMini = true;
        this.isShowMiniVideo = false;
    };
    DetailComponent.prototype.miniStyleAfterDisappear = function () {
        this.videoParent.nativeElement.style.right = '';
        this.videoParent.nativeElement.style.bottom = '';
    };
    DetailComponent.prototype.miniStyleAfterShow = function () {
        this.videoParent.nativeElement.style.right = this.videoDragService.getRightValue() + 'px';
        this.videoParent.nativeElement.style.bottom = this.videoDragService.getBottomValue() + 'px';
    };
    DetailComponent.prototype.getPreviewBackgrounds = function () {
        for (var i = 0, length_1 = this.previewList.length; i < length_1; i++) {
            this.previewBackgrounds[i] = 'url(' + this.previewList[i] + ') center center no-repeat';
        }
    };
    DetailComponent.prototype.calculateListWidth = function () {
        var imgLength = this.previewList.length;
        var width = (imgLength - 1) * (this.oneWidth + this.margin) + this.bigWidth;
        this.listRef.nativeElement.style.width = width + 'px';
    };
    DetailComponent.prototype.enterItem = function (i) {
        this.curIndex = i;
    };
    DetailComponent.prototype.showPreview = function () {
        this.showPreviewList = true;
    };
    DetailComponent.prototype.hidePreview = function () {
        this.showPreviewList = false;
    };
    DetailComponent.prototype.mousemoveSeekbar = function (e) {
        var offsetX = e['offsetX'];
        offsetX = offsetX > 0 ? offsetX : 0;
        var ratio = offsetX / this.progressBar.nativeElement.clientWidth;
        var bigOffset = ratio * this.listRef.nativeElement.clientWidth;
        var leftValue = -1 * bigOffset + offsetX;
        this.listRef.nativeElement.style.left = leftValue + 'px';
        this.curIndex = Math.ceil(bigOffset / (this.oneWidth + this.margin)) - 1;
        if (this.curIndex < 0) {
            this.curIndex = 0;
        }
        else if (this.curIndex > this.previewBackgrounds.length - 1) {
            this.curIndex = this.previewBackgrounds.length - 1;
        }
    };
    __decorate([
        ViewChild('videoParent'),
        __metadata("design:type", ElementRef)
    ], DetailComponent.prototype, "videoParent", void 0);
    __decorate([
        ViewChild('video'),
        __metadata("design:type", ElementRef)
    ], DetailComponent.prototype, "video", void 0);
    __decorate([
        ViewChild('volumeBar'),
        __metadata("design:type", ElementRef)
    ], DetailComponent.prototype, "volumeBar", void 0);
    __decorate([
        ViewChild('progressBar'),
        __metadata("design:type", ElementRef)
    ], DetailComponent.prototype, "progressBar", void 0);
    __decorate([
        ViewChild('listRef'),
        __metadata("design:type", ElementRef)
    ], DetailComponent.prototype, "listRef", void 0);
    __decorate([
        ViewChild('barWrapRef'),
        __metadata("design:type", ElementRef)
    ], DetailComponent.prototype, "barWrapRef", void 0);
    DetailComponent = __decorate([
        Component({
            selector: 'app-detail',
            templateUrl: './detail.component.html',
            styleUrls: ['./detail.component.scss']
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            VideoService,
            VideoDragService])
    ], DetailComponent);
    return DetailComponent;
}());
export { DetailComponent };
