from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from django.shortcuts import render
import json

from .models import Marker


# Create your views here.
def index(request):
    return render(request, "shellacmap/index.html")


@csrf_exempt
def markers(request):
    data = json.loads(request.body)
    print(data)
    selectedMap = data['map']

    markers = Marker.objects.filter(map=selectedMap).values()

    markersList = list(markers)

    return JsonResponse(markersList, safe=False)
