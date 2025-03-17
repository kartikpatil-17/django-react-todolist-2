from django.db import models

# Create your models here.
class Todos(models.Model):
    work = models.TextField()
    completed = models.BooleanField(default=False,blank=True)

    def __str__(self):
        return f'{self.work}'