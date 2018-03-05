import { Component, OnInit } from '@angular/core';
import { testAnim } from '../../share/services/animationTrigger';

@Component({
  selector: 'app-test-animation',
  templateUrl: './test-animation.component.html',
  styleUrls: ['./test-animation.component.scss'],
  animations: [testAnim]
})
export class TestAnimationComponent implements OnInit {

  public state: string;
  constructor() { }

  ngOnInit() {
  }

  setState(value: string) {
    this.state = value;
  }

}
