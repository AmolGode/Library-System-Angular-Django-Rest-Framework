from multiprocessing import context
from urllib import response
from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import BookSerializer
from .models import Book
from rest_framework.response import Response

# Create your views here.

class BookAPIs(APIView):
    def post(self,request): # API for save the new book in the database
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid(): 
            serializer.save()
            context = {'resp' : str(request.data.get('book_name'))+' is saved successfully..!','is_success':True}
        else:
            context = {'resp': serializer.errors}
        return Response(context)
    
    def get(self,request): # API for getting all books from database
        books = Book.objects.all().order_by('-id')
        serialzer = BookSerializer(books,many=True)
        context = {'resp' : serialzer.data}
        return Response(context)
    
    def delete(self,request,book_id): # API for delete specidic book by admin
        try:
            Book.objects.get(id=book_id).delete()
            context = {'resp' : 'Book deleted successfully..!'}
        except Exception as e:
            context = {'resp' : 'Book delete task failed..!'}
        return Response(context)

    
    def put(self,request,book_id): #API for Update book details
        try:
            book = Book.objects.get(id=book_id)
            book.book_name = request.data.get('book_name')
            book.author_name = request.data.get('author_name')
            book.publish_year = request.data.get('publish_year')
            book.book_price = request.data.get('book_price')

            book.save()

            context = {'resp' : 'Book updated successfully..!','is_success':True}
        except Exception as e:
            print(e)
            context = {'resp' : 'Book update task failed..!','is_success':True}
        return Response(context)
