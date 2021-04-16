from django.urls import path

from . import views

urlpatterns = [
    path('check', views.check, name='check'),
    path('login', views.judge_login, name='login'),
    path('fetch_data', views.fetch_data, name='fetch'),
    path('save_data', views.save_data, name='save'),
]