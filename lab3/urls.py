from django.conf.urls.defaults import *
from models import *
from views import *

urlpatterns = patterns('lab3.views',
        url(r'^$','lab3',name='lab3'),
)