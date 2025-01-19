set up your credentials 
https://medium.com/@jayantchoudhary271/creating-an-aws-s3-bucket-using-terraform-2640c74aabd9

"aws configure"



run `aws configure` in your terminal. Enter your AWS Access Key ID and AWS Secret Access Key when prompted.



terraform init in the project directory 


terraform instalation 

```
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
```

terraform -v


terraform init to create it in the folder


can use prod.tfvars or dev.tfvars as well

steps to push 

1.
terraform validate


<!-- could do a workspace system instead of the tfvars files -->
select the work space
terraform workspace new dev
terraform workspace new prod

terraform workspace select dev
terraform workspace select prod



2
Preview the Changes: Use terraform plan to preview the changes Terraform will make without applying them.
terraform plan -var-file="dev.tfvars"
terraform plan -var-file="prod.tfvars" 

3.
terraform apply -var-file="dev.tfvars" 
terraform apply -var-file="prod.tfvars"


4. after pushing changes
terraform destroy -var-file="prod.tfvars"



add an already existing bucket to be manged by terraform state
terraform import aws_s3_bucket.library_app_s3_bucket library-app-data



not terraform for the instafrature for MVC (database, dejango appm, next app)

Set up with AWS
USe my terraform setup to crete the s3 bucket 
Set up a database instance - list of things for that 


Database- set up and get infoamtion from it - make public for simple setup 
POSTGRES_DB
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_HOST


install psql client to access it from the the local version
run 'psql -h {POSTGRES_HOST} -U {POSTGRES_USER} -d {POSTGRES_DB}' to access database and make sure its active
psql -h librarydb.cjie8aiq8g61.us-east-1.rds.amazonaws.com -U dbLibraryUser -d librarydb 

librarydb.cjie8aiq8g61.us-east-1.rds.amazonaws.com

check connection
telnet librarydb.cjie8aiq8g61.us-east-1.rds.amazonaws.com 5432


need to add a postgres Rule for you IPv4 adrress





##Backend 

set up the backend in AWS using EC2 instance 

https://www.youtube.com/watch?v=uiPSnrE6uWE








##frontend 