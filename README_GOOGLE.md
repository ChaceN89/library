"""
## Step-by-Step Guide for Setting Up Google Login in Django with Allauth

### 1. **Create a Google OAuth2 Application**

1. Go to the Google Developer Console.
2. Create a new project.
3. Navigate to APIs & Services > Credentials.
4. Click Create Credentials > OAuth Client ID.
5. Configure the consent screen.
6. Choose Web Application as the application type.
7. Under Authorized JavaScript origins, add the URLs where your application will be hosted:
    - For local development: `http://localhost:3000`
    - For production: Your deployed domain.
8. Under Authorized redirect URIs, add:
    - For local development: `http://127.0.0.1:8000/accounts/google/login/callback/`
    - For production: Your deployed domain callback URL.
9. Copy the Client ID and Client Secret.

### 2. **Add Google OAuth Settings to Django**

In your `settings.py` file, configure Google OAuth by adding the client ID and secret, and set the `SITE_ID` either from the environment or hardcode it for now.

Add the relevant Google OAuth settings under `SOCIALACCOUNT_PROVIDERS` for Google OAuth scopes and authorization params.

### 3. **Add a New Site in Django Admin**

1. Go to your Django Admin at `http://127.0.0.1:8000/admin`.
2. Log in with your superuser credentials.
3. Click on **Sites**.
4. Edit or create a new site:
    - Domain: `127.0.0.1:8000` (for local) or your deployed domain (the backend).
    - Display name: Local Development Site (for local) or the deployed site name.
5. Save the site.
6. Note the `SITE_ID` from the URL (e.g., `/admin/sites/site/2/change/`, where `2` is the `SITE_ID`).

### 4. **Configure Allauth Social Application in Django Admin**

1. In the Django Admin dashboard, go to **Social Applications**.
2. Click **Add Social Application**.
3. Select **Google** as the provider.
4. Add the **Client ID** and **Client Secret** from the Google Developer Console.
5. Under **Sites**, select the correct site (e.g., `127.0.0.1:8000` for local development).
6. Save the social application.

### 5. **Test the Google Login Locally**

1. Ensure your Django server and frontend are running.
2. Navigate to the login page on your frontend and trigger the Google sign-in popup.
3. After authenticating with Google, the backend should process the login and redirect you.

### 6. **Deploying Google OAuth for Production**

1. Update your Google Developer Console with the production URLs.
2. Change the **Authorized JavaScript Origins** and **Redirect URIs** to match your production domain.
3. In your `.env` or `settings.py`, update the `SITE_ID` and Google credentials for production.
4. Update your Django Admin site settings and social application for production.

By following these steps, you will have set up Google login in Django with Allauth and prepared your application for both local development and production environments.
"""
