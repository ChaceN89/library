#!/usr/bin/env python
"""
Django's command-line utility for administrative tasks.

This script is used to execute various administrative commands for the Django project.
It sets the default settings module and then uses Django's management commands to perform tasks.

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-08-14
@since 1.0
"""

import os
import sys

def main():
    """
    Run administrative tasks.

    This function sets the default Django settings module and executes the command line
    arguments passed to the script using Django's management commands. If Django is not 
    installed or cannot be imported, an ImportError is raised with a helpful message.
    """
    # Set the default Django settings module to 'backend.settings'
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

    try:
        # Import Django's command-line utility function
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        # Raise an ImportError if Django cannot be imported
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    # Execute the command line arguments using Django's management utility
    execute_from_command_line(sys.argv)

# If this script is executed directly, call the main function
if __name__ == '__main__':
    main()
