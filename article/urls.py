from django.conf.urls import patterns, url
from article import views

urlpatterns = patterns('',

	url(r'^$', views.index, name = 'Index'),
	
);
