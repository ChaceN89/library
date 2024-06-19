from rest_framework import viewsets
from .models import Book
from .serializers import BookSerializer

from rest_framework.decorators import action, api_view, renderer_classes
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from django.conf import settings
from django.http import JsonResponse
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.views import APIView


from .services.aws_s3_service import create_using_s3_service, delete_using_s3_service


# this is a viewset for the Book model
# better to use for a model when i want to create a CRUD API for that model
class BookViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Book instances.
    """
    # The default set of objects that the viewset will work with.
    queryset = Book.objects.all()

    # The serializer class that will be used for validating and deserializing input, and for serializing output.
    serializer_class = BookSerializer


    @swagger_auto_schema(
        method='post',
        operation_description="Upload a .txt file to S3 and create a Book instance",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'title': openapi.Schema(type=openapi.TYPE_STRING, description='Title of the book'),
                'author': openapi.Schema(type=openapi.TYPE_STRING, description='Author of the book'),
                'description': openapi.Schema(type=openapi.TYPE_STRING, description='Description of the book'),
                'published_date': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_DATE, description='Publication date of the book'),
                'file': openapi.Schema(type=openapi.TYPE_FILE, description='Text file of the book')
            },
            required=['title', 'author', 'file'],
        ),
        responses={201: BookSerializer}
    )
    @action(detail=False, methods=['post'], url_path='create-using-s3')
    def create_using_s3(self, request):
        """
        Custom action to create a Book instance with file upload to S3.

        detail=False indicates this action operates on the collection (list-level), not a single instance.
        url_path specifies the URL segment for this action.
        
        request: The HTTP request object containing data and files for the book creation.
        
        Returns a Response object with the serialized Book data or an error message.
        """
        return create_using_s3_service(request)


    @action(detail=True, methods=['delete'], url_path='delete-using-s3')
    def delete_using_s3(self, request, pk=None):
        """
        Custom action to delete a Book instance and its associated file in S3.

        detail=True indicates this action operates on a single instance.
        pk (Primary Key) is the identifier for the specific Book instance to be deleted.
        url_path specifies the URL segment for this action.
        
        request: The HTTP request object.
        pk: The primary key of the Book instance to be deleted (provided by the URL).

        Returns a Response object indicating success or an error message.
        """
        return delete_using_s3_service(request, pk)
    

# detail Parameter:
#   detail=False: This means the action is performed on a collection of objects (e.g., a list view). It's a list-level action that doesn't require a specific object's primary key.
#   detail=True: This means the action is performed on a single object. It's an instance-level action that requires the primary key (pk) of the specific object.
        


# Define the dummy_var_view as a standalone function for testing .env file functionality as a new route
# better used for simple routes that don't require a model
@api_view(['GET'])
@renderer_classes([JSONRenderer])
def dummy_var_view(request):
    dummy_var = settings.DUMMY_VARIABLE
    return JsonResponse({'DUMMY_VARIABLE': dummy_var})


# this is a class-based view for testing purposes not a viewset
# Define the TestView as a standalone class-based view
# This view will handle GET, DELETE, POST, and PUT operations
class TestView(APIView):
    def get(self, request):
        return Response("GET operation")

    def delete(self, request):
        return Response("DELETE operation")

    def post(self, request):
        return Response("POST operation")

    def put(self, request):
        return Response("PUT operation")