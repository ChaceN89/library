"""
apps.py

App configuration for the API application.

This file contains the configuration for the 'api' app, including default field types and app name.

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-08-14
@since 1.0
"""

from django.apps import AppConfig

class ApiConfig(AppConfig):
    """
    Configuration class for the 'api' application.

    Attributes:
        default_auto_field (str): The default field type for auto-generated primary keys.
        name (str): The name of the app.
    """
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
