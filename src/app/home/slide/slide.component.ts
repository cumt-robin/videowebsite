import { Component, OnInit, ElementRef, ViewChild, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { VOD } from '../../share/services/dataType';

const ONE_HEIGHT = 100;

@Component({
    selector: 'app-slide',
    templateUrl: './slide.component.html',
    styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit, OnDestroy {
    @ViewChild('slideListElement') slideListElement: ElementRef;

    public bannerList: Array<VOD> = [];
    public showList: Array<VOD> = [];
    public dataLength = 0;
    public initOffsetY = 0;
    public maxOffset = 0;
    public minOffset = 0;
    public currentOffset = 0;
    public currentItemIndex = 0;
    public oneGroupNum = 4;
    public translateTimer: any = null;
    public cycleTimer: any = null;
    constructor(
        private router: Router
    ) { }

    @Input() set bannerData(data: Array<VOD>) {
        if (!data) {
            return;
        }
        this.bannerList = data;
        this.dataLength = this.bannerList.length;
        this.getShowList();
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        clearTimeout(this.translateTimer);
    }

    getShowList() {
        if (this.dataLength > this.oneGroupNum) {
            for (let i = 0; i < 3; i++) {
                this.showList = this.showList.concat(this.bannerList);
            }
            this.calculateInitOffsetY();
            this.getOffsetRange();
            this.cycleShow();
        } else {
            this.showList = this.bannerList;
        }
    }

    calculateInitOffsetY() {
        this.initOffsetY = -1 * this.dataLength * ONE_HEIGHT;
        this.currentOffset = this.initOffsetY;
        this.currentItemIndex = this.dataLength;
        this.slideListElement.nativeElement.style.transform = 'translate(0px,' + this.initOffsetY + 'px)';
    }

    getOffsetRange() {
        this.maxOffset = this.initOffsetY + ONE_HEIGHT;
        this.minOffset = this.initOffsetY - (this.dataLength - this.oneGroupNum + 1) * ONE_HEIGHT;
    }

    cycleShow() {
        clearInterval(this.cycleTimer);
        this.cycleTimer = setInterval(() => {
            this.downOperation();
        }, 5000);
    }

    upArrow() {
        clearInterval(this.cycleTimer);
        if (this.currentOffset < this.maxOffset) {
            this.currentItemIndex -= 1;
            if ((this.currentItemIndex + 1) * -1 * ONE_HEIGHT === this.currentOffset) {
                this.currentOffset += ONE_HEIGHT;
                this.translateY();
            } else if (this.currentOffset <= this.minOffset) {
                this.currentOffset += ONE_HEIGHT;
                this.translateY();
            }
        } else {
            this.currentItemIndex = 2 * this.dataLength - 2;
            this.currentOffset = -1 * this.currentItemIndex * ONE_HEIGHT;
            this.slideListElement.nativeElement.style.transform = 'translate(0px,' + (this.currentOffset - ONE_HEIGHT) + 'px)';
            this.slideListElement.nativeElement.style.transition = '0s ease-out';
            this.translateY();
        }
        this.cycleShow();
    }

    downArrow() {
        clearInterval(this.cycleTimer);
        this.downOperation();
    }

    downOperation() {
        if (this.currentOffset > this.minOffset) {
            this.currentItemIndex += 1;
            if ((this.currentItemIndex - this.oneGroupNum) * -1 * ONE_HEIGHT === this.currentOffset) {
                this.currentOffset -= ONE_HEIGHT;
                this.translateY();
            } else if (this.currentOffset >= this.maxOffset) {
                this.currentOffset -= ONE_HEIGHT;
                this.translateY();
            }
        } else {
            this.currentItemIndex = this.dataLength + 1;
            this.currentOffset = -1 * (this.currentItemIndex - this.oneGroupNum + 1) * ONE_HEIGHT;
            this.slideListElement.nativeElement.style.transform = 'translate(0px,' + (this.currentOffset + ONE_HEIGHT) + 'px)';
            this.slideListElement.nativeElement.style.transition = '0s ease-out';
            this.translateY();
        }
        this.cycleShow();
    }

    translateY() {
        clearTimeout(this.translateTimer);
        this.translateTimer = setTimeout(() => {
            this.slideListElement.nativeElement.style.transform = 'translate(0px,' + this.currentOffset + 'px)';
            this.slideListElement.nativeElement.style.transition = '0.5s ease-out';
        }, 0);
    }

    selectItem(i: number) {
        this.currentItemIndex = i;
    }

    goToVodDetail() {
        this.router.navigate(['ondemand/detail', this.showList[this.currentItemIndex]['id']]);
    }

}
