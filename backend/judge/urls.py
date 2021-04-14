from django.urls import path

from . import views

urlpatterns = [
    path('check', views.check, name='check'),
    path('login', views.judge_login, name='login'),
]