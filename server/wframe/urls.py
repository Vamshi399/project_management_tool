
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic.base import TemplateView
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('tasks/', include('tasks.urls')),
    path('token-auth/', obtain_jwt_token),
    path('core/', include('core.urls')),
    path('accounts/', include('accounts.urls')),
    path('cal/', include('cal.urls')),
    path('details/', include('details.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('', TemplateView.as_view(template_name='home.html'), name='home'),
    path('chat/', include('chat.urls', namespace='chat')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# 
    
# ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
