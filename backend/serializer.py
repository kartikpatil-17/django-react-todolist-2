from rest_framework.serializers import ModelSerializer
from .models import *

class TodoSerializer(ModelSerializer):
    class Meta:
        model = Todos
        fields = '__all__'