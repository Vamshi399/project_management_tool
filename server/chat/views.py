from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from django.http import HttpResponseRedirect, JsonResponse
from asgiref.sync import sync_to_async
from tortoise import Tortoise
from django.conf import settings
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views import generic
# Create your views here.

# chat/views.py
from django.shortcuts import render
from .models import ChatGroup
from .tortoise_models import ChatMessage

class SignUpView(generic.CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'registration/signup.html'
    
@login_required
def index(request):
    return render(request, 'chat/index.html', {})

def get_participants(group_id=None, group_obj=None, user=None):
    """ function to get all participants that belong the specific group """
    
    if group_id:
        chatgroup = ChatGroup.objects.get(id=id)
    else:
        chatgroup = group_obj

    temp_participants = []
    for participants in chatgroup.user_set.values_list('username', flat=True):
        if participants != user:
            temp_participants.append(participants.title())    
    if len(temp_participants) > 1:
        temp_participants.append('You')
    else:
        temp_participants.clear()
    return ', '.join(temp_participants)


@login_required
def room(request, group_id):
    if request.user.groups.filter(id=group_id).exists():
        chatgroup = ChatGroup.objects.get(id=group_id)
        chatGroupName = chatgroup.name.split(",")
        if len(chatGroupName)>1:
            for nameArray in chatGroupName:
                names = nameArray.split(",")
                for name in names:
                    if(name != str(request.user)):
                        chatgroup.name = name

                
        
        #TODO: make sure user assigned to existing group
        assigned_groups = list(request.user.groups.values_list('id', flat=True))
        groups_participated = ChatGroup.objects.filter(id__in=assigned_groups)
        groupNames = []
        groupName = ChatGroup()
        for grp in groups_participated:
            # print(grp.name)
            if len(grp.name.split(",")) > 1:
                groupName = grp
                groups = grp.name.split(",")
                for item in groups:
                    print(item)
                    if(item != str(request.user)):
                        groupName.name = item
                        groupNames.append(groupName)
                        # groupName.icon.
                # groupName.name = [0]
                # groupName.icon.url = "/media/chartgroup/" + groupName.name + ".png"
                # groupNames.append(groupName)
            else:
                groupNames.append(grp)
        # chatGroupName = groups_participated.name.split(",")
        return render(request, 'chat/room.html', {
            'chatgroup': chatgroup,
            'participants': get_participants(group_obj=chatgroup, user=request.user.username),
            'groups_participated': groupNames
        })
    else:
        return HttpResponseRedirect(reverse("chat:unauthorized"))

@login_required
def unauthorized(request):
    return render(request, 'chat/unauthorized.html', {})


async def history(request, room_id):

    await Tortoise.init(**settings.TORTOISE_INIT)
    chat_message = await ChatMessage.filter(room_id=room_id).order_by('date_created').values()
    await Tortoise.close_connections()

    return await sync_to_async(JsonResponse)(chat_message, safe=False)