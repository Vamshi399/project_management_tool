from django.conf.urls import url
from . import views
from .views import TasksListView,  RoleListView
urlpatterns = [
    url('project', views.ProjectCreate.as_view(), name='project-create'),
    url('tasks', views.TaskCreate.as_view(), name='task-create'),
    url('view/task', TasksListView.as_view(), name='task-view'),
    url('view/role', RoleListView.as_view(), name='role-view')
]
