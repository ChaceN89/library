# Specify Terraform configuration and required providers
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws" # Use the AWS provider from HashiCorp
      version = "~> 5.0"        # Ensure compatibility with AWS provider version 5.x
    }
  }
}

# Configure the AWS provider with the region and credentials
provider "aws" {
  region     = var.AWS_S3_REGION_NAME   # Set the AWS region (e.g., "ca-west-1")
  access_key = var.AWS_ACCESS_KEY_ID   # Access key for AWS authentication
  secret_key = var.AWS_SECRET_ACCESS_KEY # Secret key for AWS authentication
}

# Define the S3 bucket for the library application
resource "aws_s3_bucket" "library_app_s3_bucket" {
  bucket = var.AWS_STORAGE_BUCKET_NAME

  tags = {
    Environment = var.environment
  }
}