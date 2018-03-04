import { Component, OnInit, Input } from '@angular/core';
import { FadeInOut } from '../../share/services/animationTrigger';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss'],
  animations: [FadeInOut]
})
export class PicturesComponent implements OnInit {

  public photoList: Array<string> = [];
  public isShowBigPhoto = false;
  public curIndex = 0;
  public state = 'out';

  constructor() { }

  @Input() set stills(data: Array<string>) {
    this.photoList = data;
  }

  fadeInOutDone(e: Object) {
    if (e['toState'] === 'out') {
      this.isShowBigPhoto = false;
    }
  }

  ngOnInit() {
  }

  showBigPhoto(i: number) {
    this.curIndex = i;
    this.isShowBigPhoto = true;
    this.state = 'in';
  }

  hideBigPhoto() {
    this.state = 'out';
  }

  clickLeft() {
    if (this.curIndex === 0) {
      this.curIndex = this.photoList.length - 1;
    } else {
      this.curIndex--;
    }
  }

  clickRight() {
    if (this.curIndex === this.photoList.length - 1) {
      this.curIndex = 0;
    } else {
      this.curIndex++;
    }
  }

}
