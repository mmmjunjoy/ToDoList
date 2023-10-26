import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less'],
  providers: [ApiService],
})
export class SignupComponent implements OnInit {
  username = '';
  password = '';
  newusername = '';
  newpassword = '';
  SignupResult = '';

  constructor(private ApiServices: ApiService, private router: Router) {}

  // 데이터 잘 받는지 확인하는 작업
  SignupInputText() {
    console.log('username :', this.username);
    console.log('password :', this.password);
  }

  // 데이터 바깥으로 보내기 위한 함수

  PostInputText() {
    this.ApiServices.create<any>('user/signup', {
      username: this.username,
      password: this.password,
    }).subscribe(
      (json) => {
        console.log('result: ', json);
        this.SignupResult = json['result'];

        if (this.SignupResult == '0') {
          console.log('back값 확인', this.SignupResult);
          alert('회원가입이 완료되었습니다. 감사합니다.');
          this.gologin();
        } else if (this.SignupResult == '1') {
          alert('이미 사용중인 아이디입니다.');
        } else if (this.SignupResult == '2') {
          alert('빈 값을 채워주세요');
        } else console.log('미상 에러');

        // 값 저장하기 (회원가입 여부 성공 or 실패)
      },
      (error) => {
        console.log('error');
        console.log(this.username);
      }
    );
  }

  gologin() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {}
}
