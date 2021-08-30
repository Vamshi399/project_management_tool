from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Project(models.Model):
    name = models.CharField(max_length=200, unique=True)
    assignees = models.ManyToManyField(
        User, related_name='project_assignees')
    creator = models.ForeignKey(
        User, to_field='username', related_name='project_creator', on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Tasks(models.Model):
    title = models.CharField(max_length=100)
    details = models.CharField(max_length=2000)
    complete = models.BooleanField(default=False)
    assigned_by = models.ForeignKey(
        User, to_field='username', related_name='assigned_by', on_delete=models.CASCADE)
    assignee = models.ForeignKey(
        User, to_field='username', related_name='assigned', on_delete=models.CASCADE)
    project = models.ForeignKey(
        Project, to_field='name', related_name='tasks', on_delete=models.CASCADE)
    finish_date = models.DateField()

    def __str__(self):
        return self.title
