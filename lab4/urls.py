from django.conf.urls.defaults import *
from models import *
from views import *

urlpatterns = patterns('lab4.views',
        url(r'^$','lab4',name='lab4'),
)