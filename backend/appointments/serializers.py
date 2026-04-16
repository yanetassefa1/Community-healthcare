from rest_framework import serializers
from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    patient_name = serializers.SerializerMethodField(read_only=True)
    resource_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Appointment
        fields = [
            "id", "patient", "patient_name", "resource", "resource_name",
            "date", "time", "status", "reason", "notes", "created_at", "updated_at",
        ]
        read_only_fields = ["id", "patient", "created_at", "updated_at"]

    def get_patient_name(self, obj):
        return obj.patient.get_full_name()

    def get_resource_name(self, obj):
        return obj.resource.name
