from django.urls import path 
from . import views

urlpatterns = [
    path('login/',views.AdminLogin.as_view()),
    path('save_admin/',views.AdminSave.as_view()),   
]