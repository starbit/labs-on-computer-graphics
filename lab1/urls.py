from django.conf.urls.defaults import *
from models import *
from views import *

urlpatterns = patterns('lab1.views',
        url(r'^$','lab1',name='lab1'),
)