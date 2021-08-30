from django.urls import path
from .views import TasksListView, Tasks2ListView, ProjectListView, RoleListView
app_name = 'tasks'
urlpatterns = [
    path('', TasksListView.as_view()),
    path('take2', Tasks2ListView.as_view()),
    path('project', ProjectListView.as_view()),
    path('role', RoleListView.as_view())

]
