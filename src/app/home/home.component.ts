import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../share/services/event.service';
import { getHomeData } from '../share/services/interface';
import { VOD, VODColumn } from '../share/services/dataType';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public homeData: Promise<Object>;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.homeData = getHomeData();
  }

  ngOnDestroy() {
    EventService.removeAllListeners(['SCREEN_SIZE_CHANGE']);
  }

}
