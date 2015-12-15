from django.shortcuts import render_to_response
from django.http import HttpResponse

def index(request):
	#return HttpResponse('hello');
	return render_to_response('article/index.html');
