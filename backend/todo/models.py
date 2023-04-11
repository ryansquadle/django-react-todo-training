from django.db import models

# Create your models here.

class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    due_date = models.DateField(blank=True, null=True)

    class Priority(models.IntegerChoices):
        LOW = 1
        MEDIUM = 2
        HIGH = 3

    priority = models.IntegerField(choices=Priority.choices, default=1)

    def _str_(self):
        return self.title