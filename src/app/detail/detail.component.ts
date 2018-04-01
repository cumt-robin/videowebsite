import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from './video.service';
import { VideoDragService } from './video-drag.service';
import { EventService } from '../share/services/event.service';
import { UtilService } from '../share/services/utils.service';
import { getVODDetail } from '../share/services/interface';
import { VOD, VODColumn } from '../share/services/dataType';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild ('videoParent') videoParent: ElementRef;
  @ViewChild ('video') video: ElementRef;
  @ViewChild ('volumeBar') volumeBar: ElementRef;
  @ViewChild ('progressBar') progressBar: ElementRef;
  @ViewChild('listRef') listRef: ElementRef;
  @ViewChild('barWrapRef') barWrapRef: ElementRef;

  public volumeBeforeMute = 0;
  public duration = '100';
  public currentTime = '0';
  public currentShowTime = '00:00:00';
  public currentShowDuration = '00:00:00';
  public isPlayEnd = false;
  public isFullScreen = false;
  public playbuttonState = 'anticon-pause-circle-o';
  public fullScreenState = 'anticon-arrows-alt';
  public isShowMiniVideo = false;
  public isManualCloseMini = false;
  public backImgUrl = 'assets/image/p1.jpg';
  public coverImgUrl = 'assets/image/detailcover.png';
  public isLoading = true;
  public previewList: Array<string> = [];
  public previewBackgrounds: Array<string> = [];
  public oneWidth = 160;
  public bigWidth = 200;
  public margin = 2;
  public showPreviewList = false;
  public curIndex = 0;
  public vodID = '';
  public vodData: VOD;
  public recmColumns: Array<VODColumn>;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private videoDragService: VideoDragService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.backImgUrl = sessionStorage.getItem('VOD_DETAIL_PAGE_BACKGROUND_URL');
      this.vodID = params['id'];
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.resetProperties();
      this.videoService.destroyVideoElement();
      getVODDetail({id: this.vodID}).then(resp => {
        this.vodData = resp['vod'];
        this.recmColumns = resp['recomendColumns'];
        this.previewList = this.vodData['previews'];
        this.calculateListWidth();
        this.getPreviewBackgrounds();
        this.videoService.initVideoElement(this.video.nativeElement, this.videoParent.nativeElement, this.vodData.playUrl);
        this.videoDragService.initDraggingObj(this.videoParent.nativeElement);
      });
      EventService.removeAllListeners(['SCREEN_SIZE_CHANGE']);
      EventService.on('SCREEN_SIZE_CHANGE', (e) => {
        if (this.isShowMiniVideo) {
          this.videoDragService.moveElements();
        }
      });
      EventService.removeAllListeners(['LEFT_KEY_EVENT']);
      EventService.on('LEFT_KEY_EVENT', (e) => {
        this.backwardHandler(e);
      });
      EventService.removeAllListeners(['RIGHT_KEY_EVENT']);
      EventService.on('RIGHT_KEY_EVENT', (e) => {
        this.forwardHandler(e);
      });
      EventService.removeAllListeners(['VIDEO_INIT_CAN_PLAY']);
      EventService.on('VIDEO_INIT_CAN_PLAY', () => {
        this.videoReadyToPlay();
      });
      EventService.removeAllListeners(['VIDEO_TIME_UPDATE']);
      EventService.on('VIDEO_TIME_UPDATE', () => {
        this.videoTimeUpdate();
      });
      EventService.removeAllListeners(['VIDEO_END']);
      EventService.on('VIDEO_END', () => {
        this.videoPlayEnd();
      });
      EventService.removeAllListeners(['VIDEO_SCREEN_CHANGE']);
      EventService.on('VIDEO_SCREEN_CHANGE', (flag) => {
        this.isFullScreen = flag;
        if (this.isFullScreen) {
          this.fullScreenState = 'anticon-shrink';
        } else {
          this.fullScreenState = 'anticon-arrows-alt';
        }
      });
      EventService.removeAllListeners(['SHOW_MINI_VIDEO']);
      EventService.on('SHOW_MINI_VIDEO', () => {
        if (!this.isManualCloseMini) {
          this.isShowMiniVideo = true;
          this.videoDragService.setIsCanDrag(true);
          if (this.videoDragService.getHasManualDrag()) {
            this.miniStyleAfterShow();
          }
        }
      });
      EventService.removeAllListeners(['HIDE_MINI_VIDEO']);
      EventService.on('HIDE_MINI_VIDEO', () => {
        this.isManualCloseMini = false;
        this.isShowMiniVideo = false;
        this.videoDragService.setIsCanDrag(false);
        this.miniStyleAfterDisappear();
      });
      EventService.removeAllListeners(['SPACE_KEY_EVENT']);
      EventService.on('SPACE_KEY_EVENT', () => {
        this.spaceControlPlay();
      });
    });
  }

  ngOnDestroy() {
    this.videoService.destroyVideoElement();
    this.videoDragService.destroyElement();
  }

  ngAfterViewInit() {
    document.querySelector('video').oncontextmenu = () => {
      return false;
    };
  }

  resetProperties() {
    this.isShowMiniVideo = false;
    this.videoDragService.setIsCanDrag(false);
    this.miniStyleAfterDisappear();
    this.isLoading = true;
    this.isPlayEnd = false;
  }

  videoReadyToPlay() {
    this.isLoading = false;
    this.isPlayEnd = false;
    this.duration = this.videoService.getDuration();
    this.currentShowDuration = this.videoService.getFormatTime(this.duration);
  }

  videoTimeUpdate() {
    this.currentTime = this.videoService.getCurrentTime();
    this.currentShowTime = this.videoService.getFormatTime(this.currentTime);
  }

  videoPlayEnd() {
    this.isPlayEnd = true;
    this.playbuttonState = 'anticon-reload';
  }

  spaceControlPlay() {
    if (this.videoService.isFullScreen()) {
      this.playOrPause();
    }
  }

  playOrPause() {
    if (this.isPlayEnd) {
      this.isPlayEnd = false;
    }
    this.videoService.callPlayOrPause();
    if (this.videoService.isPlaying()) {
      this.playbuttonState = 'anticon-pause-circle-o';
    } else {
      this.playbuttonState = 'anticon-play-circle-o';
    }
  }

  backwardHandler(e: Object) {
    if (this.videoService.isFullScreen() && !this.isPlayEnd) {
      UtilService.preventDefault(e);
      let seekTime = +this.progressBar.nativeElement.value - 5;
      if (seekTime < 0) {
        seekTime = 0;
      }
      this.videoService.setCurrentTime(seekTime + '');
      this.checkContinuePlay();
    }
  }

  forwardHandler(e: Object) {
    if (this.videoService.isFullScreen() && !this.isPlayEnd) {
      UtilService.preventDefault(e);
      let seekTime = +this.progressBar.nativeElement.value + 5;
      if (seekTime > +this.duration) {
        seekTime = +this.duration;
      }
      this.videoService.setCurrentTime(seekTime + '');
      this.checkContinuePlay();
    }
  }

  checkContinuePlay() {
    if (this.videoService.isPaused()) {
      this.videoService.callPlay();
      this.playbuttonState = 'anticon-pause-circle-o';
    }
  }

  progressChange(e: Object) {
    this.videoService.setCurrentTime(this.progressBar.nativeElement.value);
  }

  volumeChange(e: Object) {
    this.videoService.setVolume(+this.volumeBar.nativeElement.value / 100);
  }

  fullScreenControl() {
    if (this.videoService.isFullScreen()) {
      this.videoService.exitFullScreen();
      if (this.videoDragService.getIsCanDrag() && this.videoDragService.getHasManualDrag()) {
        this.miniStyleAfterShow();
      }
    } else {
      this.videoService.enterFullScreen();
      if (this.videoDragService.getIsCanDrag()) {
        this.miniStyleAfterDisappear();
      }
    }
  }

  setMuted() {
    if (+this.volumeBar.nativeElement.value !== 0) {
      this.volumeBeforeMute = +this.volumeBar.nativeElement.value;
      this.volumeBar.nativeElement.value = '0';
      this.videoService.setVolume(0);
    } else {
      this.volumeBar.nativeElement.value = this.volumeBeforeMute + '';
      this.videoService.setVolume(this.volumeBeforeMute / 100);
    }
  }

  closeMini() {
    this.isManualCloseMini = true;
    this.isShowMiniVideo = false;
  }

  miniStyleAfterDisappear() {
    this.videoParent.nativeElement.style.right = '';
    this.videoParent.nativeElement.style.bottom = '';
  }

  miniStyleAfterShow() {
    this.videoParent.nativeElement.style.right = this.videoDragService.getRightValue() + 'px';
    this.videoParent.nativeElement.style.bottom = this.videoDragService.getBottomValue() + 'px';
  }

  getPreviewBackgrounds() {
    for (let i = 0, length = this.previewList.length; i < length; i++) {
      this.previewBackgrounds[i] = 'url(' + this.previewList[i] + ') center center no-repeat';
    }
  }

  calculateListWidth() {
    let imgLength = this.previewList.length;
    let width = (imgLength - 1) * (this.oneWidth + this.margin) + this.bigWidth;
    this.listRef.nativeElement.style.width = width + 'px';
  }

  enterItem(i: number) {
    this.curIndex = i;
  }

  showPreview() {
    this.showPreviewList = true;
  }

  hidePreview() {
    this.showPreviewList = false;
  }

  mousemoveSeekbar(e: Object) {
    let offsetX = e['offsetX'];
    offsetX = offsetX > 0 ? offsetX : 0;
    let ratio = offsetX / this.progressBar.nativeElement.clientWidth;
    let bigOffset = ratio * this.listRef.nativeElement.clientWidth;
    let leftValue = -1 * bigOffset + offsetX;
    this.listRef.nativeElement.style.left = leftValue + 'px';
    this.curIndex = Math.ceil(bigOffset / (this.oneWidth + this.margin)) - 1;
    if (this.curIndex < 0) {
      this.curIndex = 0;
    } else if (this.curIndex > this.previewBackgrounds.length - 1) {
      this.curIndex = this.previewBackgrounds.length - 1;
    }
  }

}
