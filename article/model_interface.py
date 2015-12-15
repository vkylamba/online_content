
from models import *

from django.http import Http404

class ModelInterface:
	"""
		class to infract with the models
	"""
	def get_articles(self, article_id, truncate_body_text = True):
		#the article_id can contain a number or alphabatic string, Lets see if it is 'all'
		if str(article_id) == 'all':
			articles = Article.objects.all();
		else:
			try:
				article_id = int(article_id);
				article = Article.objects.get(id=article_id);
				pub_date = str(article.publication_date);
				if truncate_body_text and len(pub_date) > 100:
					pub_date = pub_date[:100];
				return [{
					"title": article.title,
					"body_text": article.body_text,
					"author": article.author.full_name,
					"publication_date": pub_date,
					"hero_image": str(article.hero_image),
					"additional_media": str(article.additional_media),
				}];
			except:
				raise Http404;
		
		article_container = [];
		for article in articles:
			pub_date = str(article.publication_date);
			if truncate_body_text:
				pub_date = pub_date[:100];
			art = {
					"title": article.title,
					"body_text": article.body_text,
					"author": article.author.full_name,
					"publication_date": pub_date,
					"hero_image": str(article.hero_image),
					"additional_media": str(article.additional_media),
				};
			article_container.append(art);
		return article_container;
