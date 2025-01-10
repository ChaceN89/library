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

2
Preview the Changes: Use terraform plan to preview the changes Terraform will make without applying them.
terraform plan -var-file="prod.tfvars"
terraform plan -var-file="dev.tfvars"

3.
terraform apply -var-file="prod.tfvars"
terraform apply -var-file="dev.tfvars"


4. after pushing changes
terraform destroy -var-file="prod.tfvars"



add an existing bucket to be manged by terraform
terraform import aws_s3_bucket.library_app_s3_bucket library-app-data
