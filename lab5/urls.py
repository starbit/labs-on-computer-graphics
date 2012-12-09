from django.conf.urls.defaults import *
from models import *
from views import *

urlpatterns = patterns('lab5.views',
        url(r'^$','lab5',name='lab5'),
)