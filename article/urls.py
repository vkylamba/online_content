from django.conf.urls import patterns, url
from article import views

urlpatterns = patterns('',

	url(r'^$', views.index, name = 'Index'),
	url(r'^(?P<article_id>[\d\D]+)$', views.article_details, name = 'Article details'),
);
