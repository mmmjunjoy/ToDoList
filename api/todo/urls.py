from django.urls import path

from . import views

urlpatterns = [
    path('sendtodo/', views.sendtododb, name='sendtodo'),
    path('sendtodo', views.sendtododb, name='sendtodo'),
    path('sendtodo2/', views.sendtododb2, name='sendtodo'),
    path('sendtodo2', views.sendtododb2, name='sendtodo'),
    path('sendtodopopup/', views.sendtodopopup, name='sendtodopopup'),
    path('sendtodopopup', views.sendtodopopup, name='sendtodopopup'),
    path('create/', views.todocreate, name='todocreate'),
    path('create', views.todocreate, name='todocreate'),
    path('delete/', views.tododelete, name='tododelete'),
    path('delete', views.tododelete, name='tododelete'),
    path('modify/', views.todomodify, name='todomodify'),
    path('modify', views.todomodify, name='todomodify'),
    path('statusmodify/', views.statusmodify, name='statusmodify'),
    path('statusmodify', views.statusmodify, name='statusmodify'),
   



]