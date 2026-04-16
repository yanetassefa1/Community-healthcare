from django.urls import path
from .views import (
    HealthResourceListView,
    HealthResourceDetailView,
    HealthResourceAdminView,
    HealthResourceAdminDetailView,
)

urlpatterns = [
    path("", HealthResourceListView.as_view(), name="resource-list"),
    path("<int:pk>/", HealthResourceDetailView.as_view(), name="resource-detail"),
    path("admin/", HealthResourceAdminView.as_view(), name="resource-admin-list"),
    path("admin/<int:pk>/", HealthResourceAdminDetailView.as_view(), name="resource-admin-detail"),
]
