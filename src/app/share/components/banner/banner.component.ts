import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { VOD } from '../../services/dataType';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  public banners: Array<VOD> = [];

  @Input() set bannerData(data: Array<VOD>) {
    this.banners = data;
  }

  @Output() clickBanner = new EventEmitter();

  constructor() {

  }

  ngOnInit() {

  }

  gotoDetailPage(i: number) {
    this.clickBanner.emit(i);
  }
}
