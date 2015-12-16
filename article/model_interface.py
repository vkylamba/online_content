
from models import *

from django.http import Http404

class ModelInterface:
	"""
		class to infract with the models
	"""
	def get_articles(self, article_id, truncate_body_text = True):
		#the article_id can contain a number or alphabatic string, Lets see if it is 'all'
		if str(article_id) == 'all':
			articles = Article.objects.all().order_by('publication_date');
		else:
			if article_id.isdigit():
				article_id = int(article_id);
				article = Article.objects.get(id=article_id);
				bdy_text = article.body_text;
				if truncate_body_text:
					bdy_text = bdy_text[:100];
				return [{
					"id": article.id,
					"title": article.title,
					"body_text": bdy_text,
					"author": article.author.full_name,
					"author_id": article.author.id,
					"publication_date": article.publication_date.strftime("%A, %B, %d, %Y"),
					"hero_image": str(article.hero_image),
					"additional_media": str(article.additional_media),
				}];
			else:
				raise Http404;
		
		article_container = [];
		for article in articles:
			bdy_text = article.body_text;
			if truncate_body_text:
				bdy_text = bdy_text[:100];
			art = {
					"id": article.id,
					"title": article.title,
					"body_text": bdy_text,
					"author": article.author.full_name,
					"author_id": article.author.id,
					"publication_date": article.publication_date.strftime("%A, %B, %d, %Y"),
					"hero_image": str(article.hero_image),
					"additional_media": str(article.additional_media),
				};
			article_container.append(art);
		return article_container;
		
		
	#Function to return number of articles published by author
	def get_number_of_articles(self, author):
		return len(Article.objects.filter(author=author));
		
	def get_authors(self, author_id):
		#the author_id can contain a number or alphabatic string, Lets see if it is 'all'
		if str(author_id) == 'all':
			authors = Author.objects.all().order_by('signup_date');
		else:
			if author_id.isdigit():
				author_id = int(author_id);
				author = Author.objects.get(id=author_id);
				return [{
					"id": author.id,
					"nick_name": author.nick_name,
					"full_name": author.full_name,
					"birthday": author.birthday.strftime("%A, %B, %d, %Y"),
					"signup_date": author.signup_date.strftime("%A, %B, %d, %Y"),
					#"avatar": str(author.avatar), 
					"number_of_articles": self.get_number_of_articles(author),
				}];
			else:
				raise Http404;
		
		author_container = [];
		for author in authors:
			athr = {
					"id": author.id,
					"nick_name": author.nick_name,
					"full_name": author.full_name,
					"birthday": author.birthday.strftime("%A, %B, %d, %Y"),
					"signup_date": author.signup_date.strftime("%A, %B, %d, %Y"),
					#"avatar": str(author.avatar), 
					"number_of_articles": self.get_number_of_articles(author),
				};
			author_container.append(athr);
		return author_container;
