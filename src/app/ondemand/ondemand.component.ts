import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getVodHomeData } from '../share/services/interface';
import { VOD } from '../share/services/dataType';

@Component({
  selector: 'app-ondemand',
  templateUrl: './ondemand.component.html',
  styleUrls: ['./ondemand.component.scss']
})
export class OndemandComponent implements OnInit {

  public bannerList: Array<VOD> = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.queryVODHomeData();
  }

  queryVODHomeData() {
    getVodHomeData().then((resp: any) => {
      this.bannerList = resp.vodBanner;
    });
  }

  gotoVODDetail(i: number) {
    let vod = this.bannerList[i];
    sessionStorage.setItem('VOD_DETAIL_PAGE_BACKGROUND_URL', vod.url);
    this.router.navigate(['detail', vod.id]);
  }

}
