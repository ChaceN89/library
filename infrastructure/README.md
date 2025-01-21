# Infrastructure for Deployment

## Table of Contents
1. [Set Up Your Credentials](#set-up-your-credentials)
2. [Terraform Setup and S3 Bucket Deployment](#terraform-setup-and-s3-bucket-deployment)
3. [AWS RDS: Database Setup](#aws-rds-database-setup)
4. [Backend Deployment with Render](#backend-deployment-with-render)
5. [Frontend Deployment with Vercel](#frontend-deployment-with-vercel)
6. [Configuring CORS for Google Cloud Console](#configuring-cors-for-google-cloud-console)

---

## 1. Set Up Your Credentials
Before starting, ensure your AWS credentials are correctly configured on your local machine.

1. Run the following command to configure AWS credentials:
   ```bash
   aws configure
   ```
   Enter your AWS Access Key ID and AWS Secret Access Key when prompted.

2. For detailed guidance on creating an S3 bucket using Terraform, refer to [this guide](https://medium.com/@jayantchoudhary271/creating-an-aws-s3-bucket-using-terraform-2640c74aabd9).

---

## 2. Terraform Setup and S3 Bucket Deployment

### Install Terraform
1. Install Terraform using Homebrew:
   ```bash
   brew tap hashicorp/tap
   brew install hashicorp/tap/terraform
   ```
2. Verify the installation:
   ```bash
   terraform -v
   ```

### Initialize Terraform
Run `terraform init` in the project directory to initialize Terraform.

### Using `tfvars` or Workspaces

#### Requirements
To use `.tfvars` files, you need a configuration file (`dev.tfvars`, `prod.tfvars`, etc.) with the following variables:

```hcl
environment             = "<your-environment>"  # e.g., "dev" or "prod"
AWS_STORAGE_BUCKET_NAME = "<your-s3-bucket-name>"  # Name of your S3 bucket
AWS_ACCESS_KEY_ID       = "<your-access-key-id>"  # AWS access key
AWS_SECRET_ACCESS_KEY   = "<your-secret-access-key>"  # AWS secret key
AWS_S3_REGION_NAME      = "<your-region>"  # e.g., "ca-west-1"
FRONTEND_URL            = "<your-frontend-url>"  # URL of your frontend app
```

#### Option 1: Using `tfvars` Files
1. Validate the configuration:
   ```bash
   terraform validate
   ```
2. Preview changes (For Development or prod):
   ```bash
   terraform plan -var-file="dev.tfvars"
   terraform plan -var-file="prod.tfvars"
   ```
3. Apply the changes:
   ```bash
   terraform apply -var-file="dev.tfvars"
   terraform apply -var-file="prod.tfvars"
   ```
4. Destroy infrastructure when no longer needed:
   ```bash
   terraform destroy -var-file="dev.tfvars"
   terraform destroy -var-file="prod.tfvars"
   ```

#### Option 2: Using Workspaces
1. Create workspaces:
   ```bash
   terraform workspace new dev
   terraform workspace new prod
   ```
2. Select a workspace:
   ```bash
   terraform workspace select dev
   terraform workspace select prod
   ```
3. Follow the same validation, plan, and apply steps as above.

### Import an Existing S3 Bucket
If you have an existing bucket you want Terraform to manage:
```bash
terraform import aws_s3_bucket.library_app_s3_bucket library-app-data
```

---

## 3. AWS RDS: Database Setup

### Create an RDS Database Instance
1. Create a new RDS instance via the AWS Management Console or Terraform.
2. Configure the database instance with the following environment variables:
   - `POSTGRES_DB`
   - `POSTGRES_USER`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_HOST`

### Configure Security Groups
1. Add a security group to allow connections from your local machine and production environment.
2. For Render, add its [static outbound IP addresses](https://render.com/docs/static-outbound-ip) to the RDS security group.

### Validate the Database
1. Check the database connection using Django:
   ```bash
   python manage.py dbshell
   ```
2. Install the PostgreSQL client locally and run:
   ```bash
   psql -h {POSTGRES_HOST} -U {POSTGRES_USER} -d {POSTGRES_DB}
   ```
3. Verify connectivity:
   ```bash
   telnet {POSTGRES_HOST} 5432
   ```
3. Verify relations:
   ```bash
   \dt
   ```
5. Ensure your IPv4 address is allowed in the PostgreSQL security group rules.

### Migrate and Create a Superuser
1. Update the `.env` file with the RDS database settings.
2. Run migrations and create a superuser:
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```

---

## 4. Backend Deployment with Render

### Steps to Deploy the Backend
1. Create a new service in Render and connect it to your repository.
2. Add the required environment variables:
   - `POSTGRES_DB`
   - `POSTGRES_USER`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_HOST`
   - Other required variables (e.g., `SECRET_KEY`, `AWS_S3_BUCKET_NAME`)

### Start Command
Use the following Gunicorn command for deployment:
```bash
gunicorn backend.wsgi:application --bind 0.0.0.0:8000
```

---

## 5. Frontend Deployment with Vercel

### Steps to Deploy the Frontend
1. Connect your Vercel project to the repository containing your Next.js app.
2. Add the backend API URL and other required variables to the Vercel environment variables section:
   - ex. `NEXT_PUBLIC_API_BASE_URL=https://library-pauv.onrender.com`

### Deployment
1. Push your changes to the repository.
2. Vercel will automatically build and deploy the app.

### Testing
Ensure the frontend can successfully fetch data from the backend.

---

## 6. Configuring CORS for Google Cloud Console

### Configuring Allowed URLs for CORS
If your backend or storage resources (e.g., Google Cloud Storage or AWS S3) require CORS configuration, follow these steps:

#### **Google Cloud Console**
1. Navigate to the **Google Cloud Console**.
2. Go to the **Cloud Storage** section.
3. Select the bucket you want to configure.
4. Click on **Permissions** > **CORS Configuration**.
5. Add the following JSON to allow your frontend's origin:
   ```json
   [
       {
           "origin": ["https://library-gold-three.vercel.app"],
           "responseHeader": ["Content-Type", "Authorization"],
           "method": ["GET", "POST", "PUT", "DELETE"],
           "maxAgeSeconds": 3600
       }
   ]
   ```
6. Save the configuration.
7. Test CORS by accessing your resources from the frontend and checking the browser console for errors.
