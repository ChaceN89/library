terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

locals {
  environment = terraform.workspace
}

provider "aws" {
  region     = var.AWS_S3_REGION_NAME
  access_key = var.AWS_ACCESS_KEY_ID
  secret_key = var.AWS_SECRET_ACCESS_KEY
}

resource "aws_s3_bucket" "library_app_s3_bucket" {
  bucket = var.AWS_STORAGE_BUCKET_NAME

  tags = {
    Environment = var.environment
  }
}

resource "aws_s3_bucket_policy" "public_access_policy" {
  bucket = aws_s3_bucket.library_app_s3_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = "*"
        Action = "s3:GetObject"
        Resource = "arn:aws:s3:::${aws_s3_bucket.library_app_s3_bucket.id}/*"
      }
    ]
  })
}

resource "aws_s3_bucket_public_access_block" "public_access" {
  bucket                  = aws_s3_bucket.library_app_s3_bucket.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_object" "folders" {
  for_each = toset(["bookArt/", "books/", "frontendAssets/", "misc/", "profilePictures/"])
  bucket   = aws_s3_bucket.library_app_s3_bucket.id
  key      = each.value
}

resource "aws_s3_object" "frontend_assets" {
  for_each = fileset("${path.module}/s3/frontendAssets", "*")
  bucket   = aws_s3_bucket.library_app_s3_bucket.id
  key      = "frontendAssets/${each.value}"
  source   = "${path.module}/s3/frontendAssets/${each.value}"
}

resource "aws_s3_object" "misc_files" {
  for_each = fileset("${path.module}/s3/misc", "*")
  bucket   = aws_s3_bucket.library_app_s3_bucket.id
  key      = "misc/${each.value}"
  source   = "${path.module}/s3/misc/${each.value}"
}

# in the future I could set up a system to use terraform for the following instead of manual setup
# Set up the database in postgresQL 
# Set up the Frontend Nextjs project
# Set UP the Django project
