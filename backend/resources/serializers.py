from rest_framework import serializers
from .models import HealthResource


class HealthResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthResource
        fields = "__all__"
        read_only_fields = ["id", "created_at"]
