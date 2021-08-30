from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from tasks.models import Role
from core.models import Tasks
from details.models import Project
from rest_framework.authtoken.models import Token


class TaskSerializer(serializers.ModelSerializer):
    text = serializers.CharField(max_length=40)

    class Meta:
        model = Tasks
        fields = ('text', 'assignee', 'project', 'complete')

    def create(self, validated_data):
        user = User.objects.get(username=validated_data.pop('assignee'))
        task = Tasks(**validated_data, assignee=user)
        task.save()
        return task


class Task2Serializer(serializers.ModelSerializer):
    text = serializers.CharField(max_length=40)
    finish_date = serializers.DateField()

    class Meta:
        model = Tasks
        fields = ('text', 'assignee', 'project', 'complete', 'finish_date')

    def create(self, validated_data):
        user = User.objects.get(username=validated_data.pop('assignee'))
        task = Tasks(**validated_data, assignee=user)
        task.save()
        return task


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


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(max_length=32,
                                     validators=[UniqueValidator(
                                         queryset=User.objects.all())]
                                     )
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.is_superuser = True
        user.save()
        return user


class AuthUserSerializer(serializers.ModelSerializer):
    auth_token = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username',  'is_active', 'is_staff')
        # read_only_fields = ('id', 'is_active', 'is_staff')

    def get_auth_token(self, obj):
        token = Token.objects.create(user=obj)
        return token.key


class RoleSerializer(serializers.ModelSerializer):
    roles = serializers.CharField(max_length=20)
    user = UserSerializer()

    class Meta:
        model = Role
        fields = ('user', 'roles')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        roles = validated_data.pop('roles')
        user = User.objects.create(**user_data)
        user.set_password(user_data['password'])
        user.is_superuser = True
        user.save()
        assignee = Role(
            roles=roles,
            user=user,
        )
        assignee.save()
        return assignee

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.user = validated_data.get('user', instance.user)
        instance.role = validated_data.get('role', instance.role)
        instance.save()
        return instance
