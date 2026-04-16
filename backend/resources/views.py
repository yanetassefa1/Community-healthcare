from rest_framework import generics, permissions, filters
from .models import HealthResource
from .serializers import HealthResourceSerializer


class HealthResourceListView(generics.ListAPIView):
    queryset = HealthResource.objects.filter(is_active=True)
    serializer_class = HealthResourceSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ["name", "category", "city", "description"]


class HealthResourceDetailView(generics.RetrieveAPIView):
    queryset = HealthResource.objects.filter(is_active=True)
    serializer_class = HealthResourceSerializer
    permission_classes = [permissions.AllowAny]


class HealthResourceAdminView(generics.ListCreateAPIView):
    queryset = HealthResource.objects.all()
    serializer_class = HealthResourceSerializer
    permission_classes = [permissions.IsAdminUser]


class HealthResourceAdminDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = HealthResource.objects.all()
    serializer_class = HealthResourceSerializer
    permission_classes = [permissions.IsAdminUser]
