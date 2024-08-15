# library
A Full stack application so upload and share libary books 

store .txt files containing the books 

use https://www.gutenberg.org/ for txt files


nextJS 

AWS to store the texts in a s3 bucket 

Vue
- upload books
- see list of books
- pull up a new page using router with multiple pages for a book
Django
- get all books
- create new book
- get page of book
- get book infomaiton 
Postgress
- store book meta data (title, author etc)
AWS
- info URL for the actual book 
- deployment of the full stack application 



run server 

python manage.py runserver


database
make migrtions 
python manage.py makemigrations

apply migrations 
python manage.py migrate


Explanation
makemigrations: This command looks at the changes you've made to your models and creates new migration files (if there are any changes).
migrate: This command applies the migrations to the database, creating the necessary tables and schema based on your models and migration files.



create a super user 
python manage.py createsuperuser




to run backend 

if you have made changes to he models or running for the fist time
python manage.py migrate


then to run the proejct 
python manage.py runserver

create super user 
python manage.py createsuperuser


GUi for the API
pip install drf-yasg

http://127.0.0.1:8000/swagger/
http://127.0.0.1:8000/redoc/



signing in to swagger UI 

Bearer token_string as the authorization value



Granting AWS S3 Full Access to an IAM User or Role
To allow your Django application to upload files to an S3 bucket, you need to attach the AmazonS3FullAccess policy to the IAM user or role that your application uses. Follow these steps to attach the policy:

Log in to AWS Management Console:

Go to the AWS Management Console.
Sign in with your credentials.
Navigate to IAM (Identity and Access Management):

In the AWS Management Console, search for "IAM" in the services search bar and click on it.
Go to the Policies Section:

In the IAM Dashboard, click on "Policies" from the left-hand sidebar.
Search for the AmazonS3FullAccess Policy:

In the search bar at the top, type "S3" to filter policies related to S3.
Locate the AmazonS3FullAccess policy in the list.
View the Policy Details:

Click on the AmazonS3FullAccess policy name to view its details.
Attach the Policy to an IAM User or Role:

Click the "Attach" button under the "Entities attached" tab (if available).
Use the search bar or scroll through the list to find the IAM user or role associated with your Django application.
Select the IAM user or role by clicking the checkbox next to its name.
Finalize the Attachment:

Click "Next: Review" to review the policy attachment.
Once reviewed, click "Attach policy" to grant the IAM user or role full access to S3.
Verify the Attachment:

After attaching the policy, verify that the AmazonS3FullAccess policy is now listed under the attached policies for the selected IAM user or role.
By following these steps, the IAM user or role will have the necessary permissions to interact with S3 buckets, allowing your Django application to upload, manage, and retrieve files from AWS S3.





front end code for text file 

  const [textContent, setTextContent] = useState('');

  useEffect(() => {
    // Fetch the content of the text file from S3
    fetch('https://library-app-data.s3.ca-west-1.amazonaws.com/content_Hamlet.txt')
      .then(response => response.text())
      .then(data => {
        setTextContent(data);
      })
      .catch(error => {
        console.error('Error fetching the text file:', error);
        setTextContent('Failed to load content.');
      });
  }, []);


  for img just use the url 