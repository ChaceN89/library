"""
aws/delete.py

This module provides a utility function to delete files from an AWS S3 bucket.

The function `delete_file_from_s3` is designed to remove files from an S3 bucket based on their URL. 
It extracts the S3 object key from the provided URL and uses the S3 client to delete the file. This 
function is particularly useful for cleaning up files in S3 when associated database records are deleted.

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-08-15
@since 1.0

Functions:
----------
- delete_file_from_s3(file_url)
    Deletes a file from an S3 bucket based on the file's URL.

Parameters:
-----------
- file_url: The full URL of the file in the S3 bucket to be deleted.

Returns:
--------
- None: The function does not return anything. It performs the deletion operation directly.

Exceptions:
-----------
- If the file does not exist in the S3 bucket or if there are permission issues, the S3 client 
  may raise exceptions that should be handled by the calling code if needed.

"""
import boto3
from django.conf import settings

def delete_file_from_s3(file_url):
    """
    Delete a file from an S3 bucket.

    :param file_url: The URL of the file to be deleted.
    :return: None
    """
    # Extract the S3 object key from the file URL
    file_key = file_url.split(f"{settings.AWS_S3_BUCKET_NAME}.s3.{settings.AWS_S3_REGION_NAME}.amazonaws.com/")[-1]
    
    # Initialize the S3 client
    s3_client = boto3.client('s3', region_name=settings.AWS_S3_REGION_NAME, 
                             aws_access_key_id=settings.AWS_ACCESS_KEY_ID, 
                             aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
    
    # Delete the file from S3
    s3_client.delete_object(Bucket=settings.AWS_S3_BUCKET_NAME, Key=file_key)
