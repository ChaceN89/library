variable "environment" {
  description = "Deployment environment (e.g., dev, staging, prod)"
  type        = string
}

variable "AWS_STORAGE_BUCKET_NAME" {
  description = "Name of the S3 bucket for storing library app data"
  type        = string
}

variable "AWS_ACCESS_KEY_ID" {
  description = "AWS Access Key ID for S3 access"
  type        = string
  sensitive   = true
}

variable "AWS_SECRET_ACCESS_KEY" {
  description = "AWS Secret Access Key for S3 access"
  type        = string
  sensitive   = true
}

variable "AWS_S3_REGION_NAME" {
  description = "AWS region for S3 resources"
  type        = string
}
