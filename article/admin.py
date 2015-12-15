from django.contrib import admin

# Register your models here.
from article.models import *

#Registering Author model to be accessible to Admin
admin.site.register(Author);
#Registering Catagory model to be accessible to Admin
admin.site.register(Catagory);
#Registering Article model to be accessible to Admin
admin.site.register(Article);
