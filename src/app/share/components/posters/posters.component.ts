import { Component, OnInit, ElementRef, ViewChildren, Input, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { VOD, VODColumn } from '../../services/dataType';
import { PosterScale } from '../../services/animationTrigger';

@Component({
  selector: 'app-posters',
  templateUrl: './posters.component.html',
  styleUrls: ['./posters.component.scss'],
  animations: [PosterScale]
})
export class PostersComponent implements OnInit {
  @ViewChildren ('posterListsRef')posterListsRef: QueryList<ElementRef>;

  @Input() set columnData(data: Array<VODColumn>) {
    this.columns = data;
    if (this.columns) {
      this.setMinOffsetValue();
    }
  }

  public offsetValue: Array<number> = [];
  public minOffsetValue: Array<number> = [];
  public isBigScreen = true;
  public onePageItems = 6;
  public onePageWidth = 1320;
  public columns: Array<VODColumn> = [];

  constructor(public router: Router) { }

  ngOnInit() {
    EventService.on('SCREEN_SIZE_CHANGE', () => {
      this.screenSizeChange();
    });
    this.checkClientWidth();
  }

  screenSizeChange() {
    this.checkClientWidth();
    this.setMinOffsetValue();
    for (let i = 0, length = this.columns.length; i < length; i++) {
        this.setPosterListAnimation(0, i);
    }
  }

  checkClientWidth() {
    if (document.body.clientWidth < 1440) {
      this.isBigScreen = false;
      this.onePageItems = 5;
      this.onePageWidth = 900;
    } else {
      this.isBigScreen = true;
      this.onePageItems = 6;
      this.onePageWidth = 1320;
    }
  }

  setMinOffsetValue() {
    for (let i = 0, length = this.columns.length; i < length; i++) {
      this.offsetValue[i] = 0;
      this.minOffsetValue[i] = -Math.floor(this.columns[i].vods.length / this.onePageItems) * this.onePageWidth;
    }
  }

  clickLeftArrow(i: number) {
    this.setOffsetValue(true, i);
    this.setPosterListAnimation(1, i);
  }

  clickRightArrow(i: number) {
    this.setOffsetValue(false, i);
    this.setPosterListAnimation(1, i);
  }

  setPosterListAnimation(transformTime: number, i: number) {
    let child = this.posterListsRef.find((item, index) => {
      return index === i;
    });
    child.nativeElement.style.transform = 'translate(' + this.offsetValue[i] + 'px, 0px)';
    child.nativeElement.style.transition = transformTime + 's ease-out';
  }

  setOffsetValue(isPositive: boolean, i: number) {
    if (isPositive) {
      if (this.offsetValue[i] < 0) {
        this.offsetValue[i] += this.onePageWidth;
      }
    } else {
      if (this.offsetValue[i] > this.minOffsetValue[i]) {
        this.offsetValue[i] -= this.onePageWidth;
      }
    }
  }

  gotoDetailPage(vod: VOD) {
    sessionStorage.setItem('VOD_DETAIL_PAGE_BACKGROUND_URL', vod.url);
    this.router.navigate(['detail/', vod.id]);
  }

}
