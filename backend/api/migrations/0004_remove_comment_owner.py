# Generated by Django 5.1 on 2024-08-16 02:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_comment_owner'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='owner',
        ),
    ]