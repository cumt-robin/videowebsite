import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Router } from '@angular/router';
import { EventService } from './share/services/event.service';
import { UtilService } from './share/services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
  title = 'my app';
  public isTop = true;
  public showGotoTopButton = false;
  public isShowLanguageList = false;
  public gotoTopTimer: any = null;
  public curScrollTop = 0;
  public targetScrollTop = 0;
  public isHeaderAbsolute = false;
  public isBigScreen = true;
  public minScrollTopShowMiniVideo = 835;
  public goTopDisappearTimer: any = null;
  public isShowUserInfo = false;
  public userName = '';

  constructor(
    public translate: TranslateService,
    private router: Router
  ) {
    this.initTranslation();
    this.checkClientWidth();
    this.checkNavigationPosition();
  }

  ngOnInit() {
    window.onscroll = this.scrollListener.bind(this);
    document.onkeydown = this.keydownListener.bind(this);
    window.onresize = this.resizeListener.bind(this);
    let isProfileLogin = localStorage.getItem('isProfileLogin');
    if (isProfileLogin && isProfileLogin === 'true') {
      this.isShowUserInfo = true;
      this.userName = localStorage.getItem('User_Name');
    }
    EventService.removeAllListeners(['Login_Succeeded']);
    EventService.on('Login_Succeeded', () => {
      this.isShowUserInfo = true;
      this.userName = localStorage.getItem('User_Name');
    });
    EventService.removeAllListeners(['Login_Cookie_Expired']);
    EventService.on('Login_Cookie_Expired', () => {
      this.router.navigate(['login']);
    });
  }

  scrollListener(e: Object) {
    clearTimeout(this.goTopDisappearTimer);
    EventService.emit('SCROLL_EVENT', 666);
    this.curScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (this.curScrollTop > 0) {
      this.isTop = false;
      if (this.curScrollTop > 1500) {
        this.showGotoTopButton = true;
        this.goTopDisappearTimer = setTimeout(() => {
          this.showGotoTopButton = false;
        }, 5000);
      } else {
        this.showGotoTopButton = false;
      }
      this.checkMiniVideo();
    } else {
      this.showGotoTopButton = false;
      this.isTop = true;
    }
  }

  keydownListener(e: Object) {
    let keyCode = e['keyCode'] ? e['keyCode'] : e['which'];
    switch (keyCode) {
      case 32:
        EventService.emit('SPACE_KEY_EVENT');
        break;
      case 37:
        EventService.emit('LEFT_KEY_EVENT', e);
        break;
      case 38:
        EventService.emit('UP_KEY_EVENT', e);
        break;
      case 39:
        EventService.emit('RIGHT_KEY_EVENT', e);
        break;
      case 40:
        EventService.emit('DOWN_KEY_EVENT', e);
        break;
      default:
        console.log(e);
        break;
    }
  }

  resizeListener() {
    this.checkClientWidth();
    this.checkNavigationPosition();
  }

  checkMiniVideo() {
    if (this.curScrollTop > this.minScrollTopShowMiniVideo) {
      EventService.emit('SHOW_MINI_VIDEO');
    } else {
      EventService.emit('HIDE_MINI_VIDEO');
    }
  }

  checkClientWidth() {
    if (document.body.clientWidth < 1440) {
      this.minScrollTopShowMiniVideo = 610;
      if (this.isBigScreen) {
        this.checkMiniVideo();
        EventService.emit('SCREEN_SIZE_CHANGE');
      }
      this.isBigScreen = false;
    } else {
      this.minScrollTopShowMiniVideo = 835;
      if (!this.isBigScreen) {
        this.checkMiniVideo();
        EventService.emit('SCREEN_SIZE_CHANGE');
      }
      this.isBigScreen = true;
    }
  }

  checkNavigationPosition() {
    if (document.body.clientWidth < 1100) {
      this.isHeaderAbsolute = true;
    } else {
      this.isHeaderAbsolute = false;
    }
  }

  initTranslation() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  showLanguageList() {
    this.isShowLanguageList = true;
  }

  hideLanguageList() {
    this.isShowLanguageList = false;
  }

  changeLanguage(lang: string) {
    this.hideLanguageList();
    this.translate.use(lang);
  }

  gotoTop() {
    this.targetScrollTop = this.curScrollTop;
    this.gotoTopTimer = setInterval(() => {
      // 每次定时器时间，都向上滚动当前值的10%
      let scrollGap = Math.ceil(this.curScrollTop / 10);
      if (this.curScrollTop - scrollGap > 0) {
        // 如果自动向上的过程，用户自己滚动了，那么就停止自动向上。这里做一个100的差值，是为了防止一些页面变化的微抖动产生影响。
        if (this.targetScrollTop < this.curScrollTop - 100) {
          clearInterval(this.gotoTopTimer);
          return;
        }
        this.targetScrollTop = this.curScrollTop - scrollGap;
        document.body.scrollTop = this.targetScrollTop;
        document.documentElement.scrollTop = this.targetScrollTop;
      } else {
        // 防止scrollTop计算得到负值
        clearInterval(this.gotoTopTimer);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    }, 20);
  }

}
