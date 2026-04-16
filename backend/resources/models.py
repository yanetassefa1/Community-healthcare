from django.db import models


class HealthResource(models.Model):
    CATEGORY_CHOICES = [
        ("clinic", "Clinic"),
        ("hospital", "Hospital"),
        ("pharmacy", "Pharmacy"),
        ("mental_health", "Mental Health"),
        ("dental", "Dental"),
        ("vision", "Vision"),
        ("urgent_care", "Urgent Care"),
        ("community", "Community Center"),
    ]

    name = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField()
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=50)
    zip_code = models.CharField(max_length=10)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True)
    website = models.URLField(blank=True)
    accepts_insurance = models.BooleanField(default=True)
    sliding_scale = models.BooleanField(default=False)
    languages = models.CharField(max_length=300, blank=True, help_text="Comma-separated list")
    hours = models.JSONField(default=dict, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} ({self.category})"
