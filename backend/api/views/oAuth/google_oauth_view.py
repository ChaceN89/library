from django.shortcuts import redirect
from django.http import HttpResponse
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.helpers import complete_social_login
from allauth.socialaccount.models import SocialLogin
from allauth.account.models import EmailAddress
from rest_framework_simplejwt.tokens import RefreshToken
from allauth.socialaccount.providers.oauth2.client import OAuth2Error
from django.contrib.auth import login as auth_login

def google_callback(request):
    """
    Custom view to handle Google OAuth callback, close the popup, and
    set the session state with token management.
    """
    try:
        # Use the Google OAuth2 adapter to handle the login flow
        adapter = GoogleOAuth2Adapter()
        token = adapter.get_access_token(request)
        login = adapter.complete_login(request, None, token)

        # Complete the social login process
        login.token = token
        login.state = SocialLogin.state_from_request(request)
        complete_social_login(request, login)

        # If the user already exists, log them in
        if login.is_existing:
            auth_login(request, login.user)
            refresh = RefreshToken.for_user(login.user)

            # Set session variables for tokens
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

        else:
            # New user: confirm email if necessary
            EmailAddress.objects.filter(user=login.user, email=login.user.email).update(verified=True)
            auth_login(request, login.user)
            refresh = RefreshToken.for_user(login.user)

            # Set session variables for tokens
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

        # Pass the tokens back to the parent window
        response = HttpResponse(
            f'<script type="text/javascript">'
            f'window.opener.postMessage({{"access_token": "{access_token}", "refresh_token": "{refresh_token}"}}, "*");'
            f'window.close();'
            f'</script>'
        )
        return response

    except OAuth2Error:
        # Handle OAuth errors (e.g., invalid token)
        return HttpResponse(
            '<script type="text/javascript">window.opener.postMessage("auth_error", "*"); window.close();</script>'
        )
