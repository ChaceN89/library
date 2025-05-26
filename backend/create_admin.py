# create_admin.py

import os
import django
from django.contrib.auth import get_user_model

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

User = get_user_model()

username = os.environ.get('DEFAULT_ADMIN_USERNAME', 'admin')
email = os.environ.get('DEFAULT_ADMIN_EMAIL', 'admin@example.com')
password = os.environ.get('DEFAULT_ADMIN_PASSWORD', 'your-secure-password-1234')

if not User.objects.filter(is_superuser=True).exists():
    User.objects.create_superuser(username=username, email=email, password=password)
    print(f"✅ Superuser '{username}' created.")
else:
    print("ℹ️ Superuser already exists.")
