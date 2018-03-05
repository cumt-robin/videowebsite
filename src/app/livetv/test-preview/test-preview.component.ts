import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-test-preview',
  templateUrl: './test-preview.component.html',
  styleUrls: ['./test-preview.component.scss']
})
export class TestPreviewComponent implements OnInit, AfterViewInit {
  @ViewChild('seekBar') seekBar: ElementRef;
  @ViewChild('listRef') listRef: ElementRef;

  public imgList: Array<string> = [];
  public backgroundList: Array<string> = [];
  public oneWidth = 160;
  public bigWidth = 200;
  public margin = 2;
  public wrapWidth = 1100;
  public seekBarWidth = 0;
  public listWidth = 0;
  public showPreviewList = false;
  public curIndex = 0;

  constructor() { }

  ngOnInit() {
    this.getBackgroundList();
    this.calculateListWidth();
  }

  ngAfterViewInit() {
    this.seekBarWidth = this.seekBar.nativeElement.clientWidth;
  }

  getBackgroundList() {
    for (let i = 0, length = this.imgList.length; i < length; i++) {
      this.backgroundList[i] = 'url(' + this.imgList[i] + ') center center no-repeat';
    }
  }

  calculateListWidth() {
    let imgLength = this.imgList.length;
    let width = (imgLength - 1) * (this.oneWidth + this.margin) + this.bigWidth;
    this.listRef.nativeElement.style.width = width + 'px';
    this.listWidth = width;
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
    let ratio = offsetX / this.seekBarWidth;
    let bigOffset = ratio * this.listWidth;
    let leftValue = -1 * bigOffset + offsetX;
    this.listRef.nativeElement.style.left = leftValue + 'px';
    this.curIndex = Math.ceil(bigOffset / (this.oneWidth + this.margin)) - 1;
    if (this.curIndex < 0) {
      this.curIndex = 0;
    } else if (this.curIndex > this.backgroundList.length - 1) {
      this.curIndex = this.backgroundList.length - 1;
    }
  }

}
