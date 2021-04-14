from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json


# @require_http_methods(["POST"])
@csrf_exempt
def judge_login(request):
    print(request.body)
    body = json.loads(request.body)
    username =  body['username']
    password =  body['password']
    user = authenticate(request, username=username, password=password)
    print(user)
    if user is not None:
        print(1)
        login(request, user)
        return JsonResponse({"status": True})
    else:
        return JsonResponse({"status": False})


def check(request):
    response = {}
    # response['Access-Control-Allow-Origin'] = 'http://127.0.0.1:8081'
    if request.user.is_authenticated:
        response["status"] = True
    else:
        response["status"] = False
    return JsonResponse(response)
