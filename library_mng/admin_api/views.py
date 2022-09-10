from rest_framework.views import APIView
from rest_framework import status
from .models import Admin
from .serializers import AdminSerializer
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password

# Create your views here.

password_key = 'admin_password_secret_key-123'

class AdminLogin(APIView):
    def post(self,request):
        try:
            password = make_password(
            salt=password_key, password=request.data.get('password'))

            admin_obj = Admin.objects.get(email_id = request.data.get('email_id'), password = password)
            context = {'resp' : 'Admin logged successfully..!','is_valid':True,'admin_id': admin_obj.id}
            return Response(context)
        except Exception as e:
            context = {'resp' : 'Login details are Invalid..!','is_valid':False}
            print(e)
        return Response(context)

class AdminSave(APIView):
    def post(self,request):
        try:
            count = Admin.objects.filter(email_id = request.data.get('email_id')).count()
            if count != 0:
                context = {'resp' : "Email id alredy exist.",'acc_created':False}
                return Response(context)

            request.data._mutable = True
            request.data['password'] = make_password(
            salt=password_key, password=request.data.get('password'))

            serializer = AdminSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                context = {'resp' : 'Account created successfully...!','acc_created':True}
                return Response(context)
            else:
                context = {'resp' : "Invlaid data.",'acc_created':False}
        except Exception as e:
            print(e,'kjdfh hiii ==')
            context = {'resp' : str(e),'acc_created':False}
        return Response(context)