from django.conf.urls import url, include
from . import views

urlpatterns = [
    url(r'^$', views.home, name="home"),
    url(r'^project/direct=(?P<direct>.+)&name=(?P<name>.+)$', views.projects, name="projects"),
    url(r'^asymmetric-key/alg=(?P<alg>\w*)$', views.asymmetric, name="asymmetric"),
    url(r'^symmetric-key/$', views.symmetric, name="symmetric"),
    url(r'^hash/$', views.hash, name="hash")
]
