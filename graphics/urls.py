from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'graphics.views.home', name='home'),
    
    url(r'^lab1/', include('lab1.urls')),
    url(r'^lab2/', include('lab2.urls')),
    url(r'^lab3/', include('lab3.urls')),
    url(r'^lab4/', include('lab4.urls')),
    url(r'^lab5/', include('lab5.urls')),


    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
