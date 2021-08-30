from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from accounts.serializers import UserSerializer
from .models import Project, Tasks


class ProjectSerializer(serializers.ModelSerializer):
    name = serializers.CharField(min_length=3)

    class Meta:
        model = Project
        fields = ('name', 'creator')

    def create(self, validated_data):

        project = Project(**validated_data)
        project.save()
        project.save()
        return project


class TaskSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=100)
    details = serializers.CharField(max_length=100)

    class Meta:
        model = Tasks
        fields = ('title', 'details', 'assigned_by',
                  'assignee', 'project', 'complete', 'finish_date')

    def create(self, validated_data):
        title=validated_data.pop("title")
        try:
            Tasks.objects.get(title=title)
            Tasks.objects.get(title=title).delete()
        except:
            print("Object does not exists so creating a new one")
        user = User.objects.get(username=validated_data.pop('assignee'))
        user2 = User.objects.get(username=validated_data.pop('assigned_by'))
        task = Tasks(**validated_data,title=title,assigned_by=user2, assignee=user)
        task.save()
        return task

    def update(self,instance, validated_data):
        title=validated_data.pop("title")
        complete=validate_data.pop("complete")
        task=Tasks.objects.get(title=title)
        task.complete=complete
        task.save()
        return task
