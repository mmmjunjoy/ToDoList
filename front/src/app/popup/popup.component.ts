import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { TodoComponent } from '../todo/todo.component';

import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.less'],
})
export class PopupComponent implements OnInit {
  @Input() todoid = '';

  // popup 역할 - 1.create , 2. update  || default 는 createmode
  @Input() createmode = true;
  @Input() updatemode = false;

  // popup - modify모드일때 현재값 불러오기 - 부모(todo)에게 전달받아 , (+) 실제 modify할떄의 변수로 사용 - ngModel 사용해서

  @Input() todocurrentstatus = false;
  @Input() todocurrenttitle = '';
  @Input() todocurrentcontent = '';
  @Input() todocurrentduedate = '';
  @Input() todocurrentduedate2 = '';
  @Input() todocurrentcreate = '';
  @Input() todocurrentcreate2 = '';
  @Input() todocurrentupdate = '';
  @Input() todocurrentupdate2 = '';

  // /todo 기본으로 돌아가기 위한  , 자식에서 부모로 상태값 넘기기 위한 변수
  @Output() originalstate = new EventEmitter<boolean>();

  // create mode 일때 변수

  todostatus = false;
  todotitle = '';
  todocontent = '';
  tododuedate = '';

  // modify mode 일때 변수
  todomdstatus = false;

  // session 에 저장되어있는 user_id를 사용해서 todocreate 할때 기입할 변수
  userid = '';

  // 수정버튼눌렀을때 사용 변수
  todopopupdata = '';

  data = Date();

  constructor(
    private ApiServices: ApiService,
    private router: Router,
    private session: SessionService
  ) {}

  // tododata check  함수 -> 확인  ok
  checktododata() {
    console.log('status:', this.todostatus);
    console.log('title:', this.todotitle);
    console.log('content:', this.todocontent);
    console.log('duedata:', this.tododuedate);
  }

  // popup창 취소 버튼 구현

  popupcancle() {
    this.router.navigate(['/todo']);
  }

  backtoorigin(value: boolean) {
    this.originalstate.emit(value);
  }

  // todo db에 data 보내기

  PostToDoData() {
    console.log('session result', this.session.getInfo());
    console.log('duedate 실험', this.tododuedate);

    this.ApiServices.create<any>('todo/create', {
      userids: this.session.getInfo(),
      tdstatus: this.todostatus,
      tdtitle: this.todotitle,
      tdcontent: this.todocontent,
      tdduedate: this.tododuedate,
    }).subscribe(
      (json) => {
        console.log('good');
        this.router.navigate(['/todo']);
      },
      (error) => {
        console.log('error');
        alert('필수 항목을 입력해주세요.');
      }
    );
  }

  // todo 해당 id에 맞는 db 가져오기

  // todo db 수정하기

  updateToDoData() {
    var updatetime = new Date();

    this.ApiServices.update<any>('todo/modify', {
      tdmdid: this.todoid,
      tdmdstatus: this.todomdstatus,
      tdmdtitle: this.todocurrenttitle,
      tdmdcontent: this.todocurrentcontent,
      tdmdduedate: this.todocurrentduedate,
    }).subscribe(
      (json) => {
        console.log('success');
        console.log('업데이트시간', updatetime);

        this.backtoorigin(true);
        // reload방법으로 , 수정시 새로고침하여 db값 가져오기
        location.reload();
      },
      (error) => {
        console.log('error');
      }
    );
  }

  // create창에서 status상태 변경 btn 구현

  statusbtncreate() {
    if (this.todostatus == false) {
      this.todostatus = true;
    } else {
      this.todostatus = false;
    }
  }

  statusbtnupdate() {
    if (this.todomdstatus == false) {
      this.todomdstatus = true;
    } else {
      this.todomdstatus = false;
    }
  }

  // calendar 구현

  ngOnInit(): void {}
}
