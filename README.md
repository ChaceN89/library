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

