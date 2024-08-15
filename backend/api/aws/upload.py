"""
aws/upload.py

This module provides a utility function to upload files to an AWS S3 bucket.

The function `upload_file_to_s3` is designed to handle the upload of various file types, such as text files and images, to an S3 bucket. The uploaded files are stored with a unique file key that includes the owner's ID, a custom prefix, and a unique string to ensure filename uniqueness. The function returns the URL of the uploaded file, which can be used to access the file directly from the S3 bucket.

This module also retains some old code for reference, which shows the manual process of uploading files to S3 without the utility function.

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-08-15
@since 1.0

Functions:
----------
- upload_file_to_s3(file, owner_id, prefix, file_type, unique_string)
    Uploads a file to an S3 bucket and returns the file's URL.

Parameters:
-----------
- file: The file to be uploaded.
- owner_id: The ID of the owner (user) to be included in the file key.
- prefix: The prefix to be added to the file name (e.g., 'content_' or 'cover_art_').
- file_type: The MIME type of the file (e.g., 'text/plain', 'image/png').
- unique_string: A unique string to ensure filename uniqueness.

Returns:
--------
- file_url: The URL of the uploaded file in the S3 bucket.

"""
import mimetypes
import boto3
from django.conf import settings

def upload_file_to_s3(file, owner_id, prefix, file_type, unique_string):
    """
    Upload a file to an S3 bucket.

    :param file: The file to be uploaded.
    :param owner_id: The ID of the owner (user) to be included in the file key.
    :param prefix: The prefix to be added to the file name (e.g., 'content_' or 'cover_art_').
    :param file_type: The MIME type of the file (e.g., 'text/plain', 'image/png').
    :return: The URL of the uploaded file.
    """
    file_key = f'{owner_id}_{prefix}_{unique_string}_{file.name.replace(" ", "")}'
    content_type = mimetypes.guess_type(file.name)[0] or file_type

    s3_client = boto3.client('s3', region_name=settings.AWS_S3_REGION_NAME, 
                             aws_access_key_id=settings.AWS_ACCESS_KEY_ID, 
                             aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
    
    s3_client.upload_fileobj(
        file,
        settings.AWS_S3_BUCKET_NAME,
        file_key,
        ExtraArgs={
            'ContentType': content_type,
            'CacheControl': 'no-cache'  # Prevent caching
        }
    )
    file_url = f"https://{settings.AWS_S3_BUCKET_NAME}.s3.{settings.AWS_S3_REGION_NAME}.amazonaws.com/{file_key}"
    return file_url


# old code i jsut can't get rid of yet - im too nastolgic for the code of 2 hours ago

       # # Upload content file to S3
        # if content_file:
        #     content_key = f'content_{content_file.name}'
        #     content_type = mimetypes.guess_type(content_file.name)[0] or 'text/plain'
        #     s3_client.upload_fileobj(
        #         content_file,
        #         settings.AWS_S3_BUCKET_NAME,
        #         content_key,
        #         ExtraArgs={
        #             'ContentType': content_type,
        #             'CacheControl': 'no-cache'  # Prevent caching
        #         }
        #     )
        #     content_url = f"https://{settings.AWS_S3_BUCKET_NAME}.s3.{settings.AWS_S3_REGION_NAME}.amazonaws.com/{content_key}"

        # # Upload cover art file to S3 (if provided)
        # if cover_art_file:
        #     cover_art_key = f'cover_art_{cover_art_file.name}'
        #     cover_art_type = mimetypes.guess_type(cover_art_file.name)[0] or 'image/png'
        #     s3_client.upload_fileobj(
        #         cover_art_file,
        #         settings.AWS_S3_BUCKET_NAME,
        #         cover_art_key,
        #         ExtraArgs={
        #             'ContentType': cover_art_type,
        #             'CacheControl': 'no-cache'  # Prevent caching
        #         }
        #     )
        #     cover_art_url = f"https://{settings.AWS_S3_BUCKET_NAME}.s3.{settings.AWS_S3_REGION_NAME}.amazonaws.com/{cover_art_key}"
