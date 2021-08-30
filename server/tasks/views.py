from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
from django.shortcuts import render, redirect
from core.models import Tasks2
from details.models import Project, Tasks
from django.views.decorators.http import require_POST
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from accounts.serializers import UserSerializer

from rest_framework.generics import (
    ListAPIView
)
from rest_framework import permissions
from accounts.serializers import Task2Serializer, ProjectSerializer, RoleSerializer
from .models import Role
from details.serializers import TaskSerializer


class TasksListView(ListAPIView):
    queryset = Tasks.objects.all()
    serializer_class = TaskSerializer
    permission_classes = (permissions.AllowAny, )


class Tasks2ListView(ListAPIView):
    queryset = Tasks2.objects.all()
    serializer_class = Task2Serializer
    permission_classes = (permissions.AllowAny, )


class ProjectListView(ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = (permissions.AllowAny, )


class RoleListView(ListAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = (permissions.AllowAny, )
