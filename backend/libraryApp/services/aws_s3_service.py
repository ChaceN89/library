
import boto3
from botocore.exceptions import NoCredentialsError
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from ..models import Book
from ..serializers import BookSerializer

def create_using_s3_service(request):
    # Get the file from the request
    file = request.FILES.get('file')
    if not file:
        return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Check if the file is a txt file
    if not file.name.endswith('.txt'):
        return Response({"error": "Only .txt files are allowed"}, status=status.HTTP_400_BAD_REQUEST)
    
    s3 = boto3.client('s3',
                      aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                      aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                      region_name=settings.AWS_S3_REGION_NAME)
    
    try:
        # Upload the file to S3
        s3.upload_fileobj(file, settings.AWS_STORAGE_BUCKET_NAME, file.name)
        file_url = f"https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/{file.name}"
        
        # Create a Book instance
        book = Book.objects.create(
            title=request.data.get('title'),
            author=request.data.get('author'),
            description=request.data.get('description'),
            file_url=file_url,
            published_date=request.data.get('published_date')
        )
        serializer = BookSerializer(book)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except NoCredentialsError:
        return Response({"error": "AWS credentials not available"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def delete_using_s3_service(request, pk):
    try:
        book = Book.objects.get(pk=pk)
        file_name = book.file_url.split('/')[-1]
        s3 = boto3.client('s3',
                          aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                          aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                          region_name=settings.AWS_S3_REGION_NAME)
        s3.delete_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=file_name)
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Book.DoesNotExist:
        return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)
    except NoCredentialsError:
        return Response({"error": "AWS credentials not available"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
