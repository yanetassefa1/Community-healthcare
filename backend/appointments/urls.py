from django.urls import path
from .views import AppointmentListCreateView, AppointmentDetailView, MyAppointmentsView

urlpatterns = [
    path("", AppointmentListCreateView.as_view(), name="appointment-list-create"),
    path("<int:pk>/", AppointmentDetailView.as_view(), name="appointment-detail"),
    path("me/", MyAppointmentsView.as_view(), name="my-appointments"),
]
