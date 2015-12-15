from django.contrib import admin

# Register your models here.
from article.models import *

#Registering Author model to be accessible to Admin
class AuthorAdmin(admin.ModelAdmin):
	list_display = ('nick_name', 'full_name', 'signup_date');
admin.site.register(Author, AuthorAdmin);


#Registering Catagory model to be accessible to Admin
admin.site.register(Catagory);


#Registering Article model to be accessible to Admin
class ArticleAdmin(admin.ModelAdmin):
	list_display = ('title', 'author', 'publication_date', 'catagory');
admin.site.register(Article, ArticleAdmin);
