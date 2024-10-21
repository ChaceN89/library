# Create s3 bucket for library app with series of folders
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-south-1" // Specify the AWS region where resources will be created
}

resource "aws_s3_bucket" "bucket" {
  bucket = "your-bucket-name" // Enter Bucket Name

  tags = {
    Name        = "My bucket"
  }
}