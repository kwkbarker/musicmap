# Generated by Django 3.1.5 on 2021-04-08 12:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shellacmap', '0002_auto_20210408_0046'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='marker',
            name='flag',
        ),
        migrations.RemoveField(
            model_name='marker',
            name='video',
        ),
        migrations.AddField(
            model_name='marker',
            name='textref',
            field=models.CharField(default='', max_length=2048),
        ),
        migrations.AlterField(
            model_name='marker',
            name='audiolabel',
            field=models.CharField(default='', max_length=360),
        ),
    ]
