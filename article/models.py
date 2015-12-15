from django.db import models
import os


#Function to return path to store media
def get_image_path(instance, filename):
    return os.path.join('media', str(instance.id), filename)

#model to represent Author table
class Author(models.Model):
	"""
		Model to store Author information
	"""
	nick_name = models.CharField(max_length = 50, help_text = 'Nickname of the author');
	full_name = models.CharField(max_length = 100, help_text = 'Full name of the author');
	birthday = models.DateField( blank=True, null=True, help_text = 'Birthday of the author');
	signup_date = models.DateField( blank=True, null=True, help_text = 'Date when the author signed up');
	

#Model to represent Article Catagories
class Catagory(models.Model):
	"""
		Class to store Aricle catagory informations
	"""
	name = models.CharField(max_length = 30, help_text = 'Catagory name');

#model to represent the Article
class Article(models.Model):
	"""
		Model to store Atricle information
	"""
	title = models.CharField(max_length = 100, help_text = 'Title for the Article');
	author = models.ForeignKey(Author, help_text = 'Author of the article');
	publication_date = models.DateField(help_text = 'Date of publication');
	catagory = models.ForeignKey(Catagory, help_text = 'Catagory of the article');
	hero_image = models.ImageField(upload_to=get_image_path, blank=True, null=True, help_text = 'Hero image for the article');
	additional_media = models.ImageField(upload_to=get_image_path, blank=True, null=True, help_text = 'Additional media for the article');
	body_text = models.CharField(max_length = 5000, help_text = 'Body of the Article');
