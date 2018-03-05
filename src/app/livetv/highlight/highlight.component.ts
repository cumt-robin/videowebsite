import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss']
})
export class HighlightComponent implements OnInit {

  constructor() { }

  public keyword = '';
  public hasStopInput = true;
  public checkInputTimer: any = null;
  public textContent = 'this is an article for test.The system will collect your usage data (such as your browsing history, login/logout records, and viewing history) for refined operations. The system will mine and analyze your preferences based on your usage data. When you browse content recommendation slots or search for content, the system will recommend personalized content based on your preferences, helping you find your favorite content more quickly.this is an article for test.The system will collect your usage data (such as your browsing history, login/logout records, and viewing history) for refined operations. The system will mine and analyze your preferences based on your usage data. When you browse content recommendation slots or search for content, the system will recommend personalized content based on your preferences, helping you find your favorite content more quickly.this is an article for test.The system will collect your usage data (such as your browsing history, login/logout records, and viewing history) for refined operations. The system will mine and analyze your preferences based on your usage data. When you browse content recommendation slots or search for content, the system will recommend personalized content based on your preferences, helping you find your favorite content more quickly.this is an article for test.The system will collect your usage data (such as your browsing history, login/logout records, and viewing history) for refined operations. The system will mine and analyze your preferences based on your usage data. When you browse content recommendation slots or search for content, the system will recommend personalized content based on your preferences, helping you find your favorite content more quickly.this is an article for test.The system will collect your usage data (such as your browsing history, login/logout records, and viewing history) for refined operations. The system will mine and analyze your preferences based on your usage data. When you browse content recommendation slots or search for content, the system will recommend personalized content based on your preferences, helping you find your favorite content more quickly.this is an article for test.The system will collect your usage data (such as your browsing history, login/logout records, and viewing history) for refined operations. The system will mine and analyze your preferences based on your usage data. When you browse content recommendation slots or search for content, the system will recommend personalized content based on your preferences, helping you find your favorite content more quickly.';
  public innerHTML = this.textContent;

  ngOnInit() {

  }

  inputKeydown(e: any) {
    clearTimeout(this.checkInputTimer);
    this.hasStopInput = false;
  }

  inputKeyup(e: any) {
    this.keyword = e.target.value;
    clearTimeout(this.checkInputTimer);
    this.checkInputTimer = setTimeout(() => {
      this.hasStopInput = true;
      this.doHighLight();
    }, 500);
  }

  doHighLight() {
    if (this.textContent.includes(this.keyword) && this.keyword !== '') {
      let textArray = this.textContent.split(this.keyword);
      this.innerHTML = this.getNewInnerHTML(textArray);
    } else {
      this.innerHTML = this.textContent;
    }
  }

  getNewInnerHTML(textArray: Array<string>) {
    let result = '';
    for (let i = 0, length = textArray.length; i < length; i++) {
      result += textArray[i];
      if (i !== length - 1) {
        result += '<span style="color:#FCCB35">' + this.keyword + '</span>';
      }
    }
    return result;
  }

}
