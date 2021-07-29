# Generated by Django 3.1.5 on 2021-04-05 17:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Marker',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lat', models.DecimalField(decimal_places=4, max_digits=12)),
                ('lng', models.DecimalField(decimal_places=4, max_digits=12)),
                ('flag', models.CharField(max_length=128)),
                ('audio', models.CharField(max_length=128)),
                ('video', models.CharField(max_length=128)),
                ('text', models.CharField(max_length=1024)),
                ('heading', models.CharField(max_length=128)),
                ('map', models.CharField(max_length=128)),
            ],
        ),
    ]
