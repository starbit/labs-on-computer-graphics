from django.conf.urls.defaults import *
from models import *
from views import *

urlpatterns = patterns('lab2.views',
        url(r'^$','lab2',name='lab2'),
)