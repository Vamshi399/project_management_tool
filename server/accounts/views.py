from django.contrib.auth import get_user_model
from .utils import get_and_authenticate_user
from . import serializers
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework import viewsets, status
from django.core.exceptions import ImproperlyConfigured
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from accounts.serializers import RoleSerializer, TaskSerializer, Task2Serializer, ProjectSerializer
from django.contrib.auth.models import User
from core.models import Project, Tasks
from tasks.models import Role
from django.core import serializers
from django.contrib.auth.models import Permission,User
from chat.models import ChatGroup
# from .models import User

class RoleView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        role = Role.objects.all()
        serialized_queryset = serializers.serialize('json', role)
        return serialized_queryset


class UserCreate(APIView):
    """ 
    Creates the user. 
    """
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        serializer = RoleSerializer(data=request.data)
        serializer.is_active = True
        serializer.is_staff = True
        serializer.is_admin = True
        serializer.is_superuser = True
        if serializer.is_valid():
            user = serializer.save()
            if user:
                # group = ChatGroup.objects.get(name=user.user_type)
                # user.groups.add(group)
                # user.save()
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


class Task2Create(APIView):
    """ 
    Creates the Tasks. 
    """
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        serializer = Task2Serializer(data=request.data)
        if serializer.is_valid():
            task = serializer.save()
            if task:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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


User = get_user_model()
