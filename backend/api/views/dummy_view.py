from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings

class BaseDummyVarView(APIView):
    def get(self, request):
        dummy_var = settings.DUMMY_VAR
        return Response({"dummy_var": dummy_var})
    

    