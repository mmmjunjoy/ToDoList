import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

// 로그인에서 세션 사용

import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [ApiService],
})
export class LoginComponent implements OnInit {
  loginusername = '';
  Userid = '';
  loginpassword = '';
  loginresult = false;
  key: string = '';

  constructor(
    private ApiServices: ApiService,
    private router: Router,
    private session: SessionService
  ) {}

  loginInputText() {
    this.ApiServices.create<any>('user/login', {
      loginusernames: this.loginusername,
      loginpasswords: this.loginpassword,
    }).subscribe(
      (json) => {
        console.log('result: ', json);
        this.loginresult = json['result'];
        this.Userid = json['resUserid'];

        if (this.loginresult == true) {
          //로그인 성공할시 session사용하여 localstorage에 저장되게 하자
          this.session.setInfo(this.Userid);

          this.GoMainPage();
          console.log('success_login', this.loginresult);
        } else {
          alert('아이디 또는 패스워드를 확인하세요.');
          console.log('fail_login', this.loginresult);

          // this.LoginError();
        }
      },
      (error) => {
        console.log('error');
      }
    );
  }

  GoMainPage() {
    this.router.navigate(['/todo']);
  }

  ngOnInit(): void {}
}
