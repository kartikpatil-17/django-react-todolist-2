from . import views
from django.urls import path


urlpatterns = [
    path('',views.index),
    path('add/',views.add),
    path('edit/<int:id>',views.edit),
    path('delete/<int:id>',views.delete),
]