import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { VerticalScroll } from '../../share/services/vertical-scroll.service';
import { HorizontalScroll } from '../../share/services/horizontal-scroll.service';
import { EventService } from '../../share/services/event.service';

@Component({
  selector: 'app-test-scroll',
  templateUrl: './test-scroll.component.html',
  styleUrls: ['./test-scroll.component.scss']
})
export class TestScrollComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('parentElement') parentElement: ElementRef;
  @ViewChild('contentBox') contentBox: ElementRef;
  @ViewChild('content') content: ElementRef;
  @ViewChild('scrollBox') scrollBox: ElementRef;
  @ViewChild('scrollBar') scrollBar: ElementRef;
  @ViewChild('horizontalBox') horizontalBox: ElementRef;
  @ViewChild('horizontalBar') horizontalBar: ElementRef;

  public isDragging = false;

  constructor(
    private verticalScroll: VerticalScroll,
    private horizontalScroll: HorizontalScroll
  ) { }

  ngOnInit() {
    EventService.removeAllListeners(['SCROLLBAR_DRAG_START']);
    EventService.on('SCROLLBAR_DRAG_START', () => {
      this.isDragging = true;
    });
    EventService.removeAllListeners(['SCROLLBAR_DRAG_END']);
    EventService.on('SCROLLBAR_DRAG_END', () => {
      this.isDragging = false;
    });
  }

  ngAfterViewInit() {
    this.initializeVerticalScroll();
    this.initializeHorizontalScroll();
  }

  ngOnDestroy() {
    this.verticalScroll.unbindEvent();
    this.horizontalScroll.unbindEvent();
  }

  initializeVerticalScroll() {
    this.verticalScroll.initializeElement(this.parentElement.nativeElement, this.contentBox.nativeElement, this.content.nativeElement,
      this.scrollBox.nativeElement, this.scrollBar.nativeElement);
  }

  initializeHorizontalScroll() {
    this.horizontalScroll.initializeElement(this.contentBox.nativeElement, this.content.nativeElement,
      this.horizontalBox.nativeElement, this.horizontalBar.nativeElement);
  }

}
