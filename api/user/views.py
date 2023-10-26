from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from .models import UserSignup
import urllib.request
import json


# Create your views here.



# 1. 회원가입
# user/signup
def signup(request):
  
  if request.method == 'POST':

    # POST처리 성공여부 확인
    print("signup_success")

    # try:
 
    #어느 곳에 데이터가 들어가있는지 확인(body or POST)
    print('body',request.body)
    print('post',request.POST)


    #프론트에서 데이터 받아서 저장
    SignupPayload = json.loads(request.body)
    print("payload" , SignupPayload)
    username = SignupPayload["username"]
    password = SignupPayload["password"]


    print("test", username , password)

    # ---회원삭제---

    # deletes = UserSignup.objects.all()
    # deletess = deletes.delete()
   

    # 1. 회원가입시 user_name 중복체크

    # 1.1 현재 table의 username 모두 가져오기
    usernameset = UserSignup.objects.all().values_list('user_name' , flat = True)
    print("현재 usrname:", usernameset)


    # ---프론트에게 던져줄 값---

    # -> 0,1 에서 null값 처리를 위해 경우를 세분화 (성공,중복에러,null에러)

    success = {
      'result': '0'

    }

    DuplicationFail = {
      'result' : '1'
    }

    NullFail ={
      'result' : '2'
    }

    # print("프론트값전달" , success, DuplicationFail )

    # 1.2.1  -> null값은 불통처리

    if (username == '') or (password == ''):
      return JsonResponse(NullFail)
    
    # 1.2 중복체크 통과 -> 저장  , 불통 -> 경고메세지
    for i in usernameset:
      if i == username:
          # 불통 -> 경고메세지 실행 및 http 오류 처리
          print("---error: 사용자 정보가 중복으로 존재합니다---")
          return JsonResponse(DuplicationFail )
    # 통과 -> 저장 및 확인메세지 출력
    new_user = UserSignup.objects.create(user_name= username , password =password )
    print("---success: 저장이 되었습니다---")
    return JsonResponse(success )


    # 예외처리
    # except Exception as e:
    #   print("error", e)

      
   

# 2. 로그인
# user/login

# 먼저, username부터 확인하고 성공시 다음 orm 진행 
# 통과 할시, password 값 확인 후 로그인 처리

def login(request):
  
  if request.method == 'POST':

    print("로그인 통신")

    #0. front에서 사용자가 기입한 username과 password값 

    LoginPayload = json.loads(request.body)
    print("front data: ", LoginPayload)
    LoginUsername = LoginPayload["loginusernames"]
    print("사용자입력id : " ,LoginUsername)
    LoginPassword = LoginPayload["loginpasswords"]
    print("사용자입력pw : " ,LoginPassword)

    #1.DB username 확인 

    UsernameSet = UserSignup.objects.all().values_list("user_name" , flat = True)
    print(UsernameSet)



    
    # 1단계, username 일치하는지 확인

    loginusernamefail = {
      "result" : False
    }

    x =0 
    for i in UsernameSet:
      if i == LoginUsername:
        x += 1
        print("x", x)
      else:
        print("bad")
      
    if x ==0:
      print("username fail _ firstfail")
      return JsonResponse(loginusernamefail)
    



    #2.DB에서 해당 user -> password 확인

    Passwordreal = UserSignup.objects.filter(user_name = LoginUsername).values_list("password", flat= True)
    print("아사람의 패스워드: " ,Passwordreal[0])

    #2-2 -> session이용하기 위한 해당 username에 대한 userid값 넘겨주기
    Userids = UserSignup.objects.filter(user_name = LoginUsername).values("id")

    print("USERID:" , Userids)




    # 2단계, username 일치 통과한 유저는 password 일치하는지 확인

    loginsuccess = {
      "result" : True,
      "resUserid" : Userids[0]["id"]
    }

    loginpasswordfail = {
      "result" : False
    }

    
    # 수정  -> passwordset -> passwordreal(하나의 값)
    if Passwordreal[0] == LoginPassword:
        print("로그인성공", loginsuccess)
        return JsonResponse(loginsuccess )
    return JsonResponse(loginpasswordfail)
     
  
    

  

          
    
