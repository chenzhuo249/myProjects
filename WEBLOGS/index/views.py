import json

from django.http import JsonResponse
from django.shortcuts import render
from .models import Index

# Create your views here.
def index_view(request):

    # uname = request.GET.get("uname", "not found")
    # uname = request.POST.get("uname", "not found")

    uname = json.loads(request.body.decode()).get("uname", "not found")

    try:
        list_obj = Index.objects.filter(uname=uname)
    except Exception as e:
        print(e)
        return JsonResponse({"code":400, "error":"Index filter error"})

    list_img = [obj.img for obj in list_obj]


    return JsonResponse({"code":200, "data": list_img})