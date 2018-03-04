import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { login } from '../share/services/interface';
import { EventService } from '../share/services/event.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username = '';
  public password = '';
  public showErrorInfo = false;
  constructor(
    private router: Router
  ) {
    let isLogin = localStorage.getItem('isProfileLogin');
    if (isLogin && isLogin === 'true') {
      this.router.navigate(['home']);
    }
  }

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  doLogin() {
    let req = {
      name: this.username,
      password: this.password
    };
    login(req).then(resp => {
      this.showErrorInfo = false;
      this.router.navigate(['home']);
      localStorage.setItem('isProfileLogin', 'true');
      localStorage.setItem('User_Name', this.username);
      EventService.emit('Login_Succeeded');
    }, resp => {
      this.showErrorInfo = true;
    });
  }

}
