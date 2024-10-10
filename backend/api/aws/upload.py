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
import uuid
import boto3
from django.conf import settings

def upload_file_to_s3(file, owner_id, prefix, file_type, unique_string):
    """
    Upload a file to an S3 bucket.

    :param file: The file to be uploaded.
    :param owner_id: The ID of the owner (user) to be included in the file key.
    :param prefix: The prefix to be added to the file name (e.g., 'content', 'cover_art', 'profile_image').
    :param file_type: The MIME type of the file (e.g., 'text/plain', 'image/png').
    :param unique_string: A unique string to ensure filename uniqueness.
    :return: The URL of the uploaded file.
    """
    # Define the folder structure
    if prefix == 'content':
        folder = 'books/'  # Content files go to the 'books/' folder
    elif prefix == 'cover_art':
        folder = 'bookArt/'  # Cover art goes to the 'bookArt/' folder
    elif prefix == 'profile_image':
        folder = 'profilePictures/'  # Profile pictures go to the 'profilePictures/' folder
    else:
        folder = 'misc/'  # Default folder in case of unspecified prefix
    
    # Create the file key with the folder structure
    file_key = f'{folder}{owner_id}_{prefix}_{unique_string}_{file.name.replace(" ", "")}'
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




def edit_upload(new_file, existing_file_url=None, prefix='content', owner_id=None):
    """
    Overwrite an existing file in S3 or upload a new file if no existing file is provided.

    :param new_file: The new file to be uploaded or overwrite the existing file.
    :param existing_file_url: The URL of the existing file to overwrite. If None, a new file will be uploaded.
    :param prefix: The prefix for the new file key (default is 'content').
    :param owner_id: The ID of the file owner, used for generating new file keys.
    :return: The URL of the uploaded (or overwritten) file.
    """
    s3_client = boto3.client('s3', region_name=settings.AWS_S3_REGION_NAME, 
                             aws_access_key_id=settings.AWS_ACCESS_KEY_ID, 
                             aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)

    if existing_file_url:
        # Extract the existing file key from the URL
        file_key = existing_file_url.split(f"{settings.AWS_S3_BUCKET_NAME}.s3.{settings.AWS_S3_REGION_NAME}.amazonaws.com/")[-1]
    else:
        # Generate a new file key if no existing file is provided
        unique_string = str(uuid.uuid4())
        file_key = f'{owner_id}_{prefix}_{unique_string}_{new_file.name.replace(" ", "")}'

    # Determine content type
    content_type = mimetypes.guess_type(new_file.name)[0] or 'application/octet-stream'

    # Upload the file (overwrite if existing_file_url is provided)
    try:
        s3_client.upload_fileobj(
            new_file,
            settings.AWS_S3_BUCKET_NAME,
            file_key,
            ExtraArgs={
                'ContentType': content_type,
                'CacheControl': 'no-cache'  # Prevent caching
            }
        )
    except Exception as e:
        # Handle exception (e.g., log it, raise a custom error, etc.)
        print(f"Failed to upload file to S3: {str(e)}")
        raise

    # Return the file URL
    file_url = f"https://{settings.AWS_S3_BUCKET_NAME}.s3.{settings.AWS_S3_REGION_NAME}.amazonaws.com/{file_key}"
    return file_url