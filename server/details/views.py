from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework import viewsets, status
from django.core.exceptions import ImproperlyConfigured
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from .serializers import ProjectSerializer, TaskSerializer
from accounts.serializers import RoleSerializer
from rest_framework.generics import (
    ListAPIView
)
from .models import Tasks, Project
from tasks.models import Role

# Create your views here.


class ProjectCreate(APIView):
    """ 
    Creates the Project. 
    """
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            project = serializer.save()
            if project:
                print(project)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskCreate(APIView):
    """ 
    Creates the Tasks. 
    """
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            task = serializer.save()
            if task:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TasksListView(ListAPIView):
    queryset = Tasks.objects.all()
    serializer_class = TaskSerializer
    permission_classes = (permissions.AllowAny, )


class RoleListView(ListAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = (permissions.AllowAny, )
