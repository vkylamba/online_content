
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
					"publication_date": str(article.publication_date),
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
					"publication_date": str(article.publication_date),
					"hero_image": str(article.hero_image),
					"additional_media": str(article.additional_media),
				};
			article_container.append(art);
		return article_container;
