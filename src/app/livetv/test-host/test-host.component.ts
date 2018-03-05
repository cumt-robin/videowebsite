import { Component, OnInit, HostListener, HostBinding, Directive } from '@angular/core';

@Directive({
  selector: '[appToggle]'
})

export class ToggleClassDirective {
  @HostBinding('class.red') red: boolean;

  @HostListener('mouseenter')
  onEnter() {
    this.red = true;
  }

  @HostListener('mouseleave')
  onLeave() {
    this.red = false;
  }
}

@Component({
  selector: 'app-test-host',
  templateUrl: './test-host.component.html',
  styleUrls: ['./test-host.component.scss']
})
export class TestHostComponent implements OnInit {

  public time = 0;

  constructor() { }

  @HostListener('click', ['$event'])
  onClick() {
    this.time++;
  }

  // @HostListener('document:click', ['$event'])
  // onDocumentClick(e) {
  //   this.time++;
  //   console.log(e);
  // }

  ngOnInit() {
  }

}
