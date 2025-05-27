# create_admin.py

import os
import django
from decouple import config
from django.contrib.auth import get_user_model

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

User = get_user_model()

# Use decouple to read from the .env file
username = config('DEFAULT_ADMIN_USERNAME', default=None)
email = config('DEFAULT_ADMIN_EMAIL', default=None)
password = config('DEFAULT_ADMIN_PASSWORD', default=None)

if not all([username, email, password]):
    print("❌ Admin creation skipped — missing environment variables.")
else:
    if not User.objects.filter(is_superuser=True).exists():
        User.objects.create_superuser(username=username, email=email, password=password)
        print(f"✅ Superuser '{username}' created.")
    else:
        print("ℹ️ Superuser already exists.")
