from django.shortcuts import render_to_response
from django.http import Http404, HttpResponse
from django.core import serializers
import json
import model_interface


def index(request):
	#return HttpResponse('hello');
	return render_to_response('article/index.html');
	
def article_details(request, article_id):
	
	mi = model_interface.ModelInterface();
	articles = mi.get_articles(article_id);
	articles = json.dumps(articles);
	return HttpResponse(articles);
	
def load_article_details(request, article_id):
	
	mi = model_interface.ModelInterface();
	articles = mi.get_articles(article_id, False);
	articles = json.dumps(articles);
	return HttpResponse(articles);
	

def author_details(request, author_id):
	
	mi = model_interface.ModelInterface();
	authors = mi.get_authors(author_id);
	authors = json.dumps(authors);
	return HttpResponse(authors);
