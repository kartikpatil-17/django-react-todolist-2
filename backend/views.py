from django.shortcuts import redirect, render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializer import *

@api_view()
def index(request):
    model = Todos.objects.all().order_by('-id')
    serializer = TodoSerializer(model,many=True)

    return Response(serializer.data)

@api_view(['POST'])
def add(request):
    model = Todos.objects.all()
    serializer = TodoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['POST'])
def edit(request,id):
    model = Todos.objects.get(id=id)
    serializer = TodoSerializer(data=request.data,instance=model)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def delete(request,id):
    model = Todos.objects.get(id=id)
    model.delete()
    return redirect('/')