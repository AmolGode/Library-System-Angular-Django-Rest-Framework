from django.urls import path 
from . import views

urlpatterns = [
    path('save_book/',views.BookAPIs.as_view()),  
    path('get_all_books/',views.BookAPIs.as_view()),
    path('delete_book/<int:book_id>/',views.BookAPIs.as_view()),  
    path('update_book/<int:book_id>/',views.BookAPIs.as_view()),  
]