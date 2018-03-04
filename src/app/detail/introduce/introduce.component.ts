import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.scss']
})
export class IntroduceComponent implements OnInit {

  public vodIntroduce = '';
  constructor() { }

  @Input() set introduce(data: string) {
    this.vodIntroduce = data;
  }

  ngOnInit() {
  }

}
