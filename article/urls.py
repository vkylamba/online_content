from django.conf.urls import patterns, url
from article import views

urlpatterns = patterns('',

	url(r'^$', views.index, name = 'Index'),
	url(r'^(?P<author_id>[\d\D]+)/author$', views.author_details, name = 'Author details'),
	url(r'^(?P<article_id>[\d\D]+)/view$', views.load_article_details, name = 'view article details'),
	url(r'^(?P<article_id>[\d\D]+)$', views.article_details, name = 'Article details'),
);
