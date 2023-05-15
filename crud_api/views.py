from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import todo

# Create your views here.

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = todo.objects.all()
