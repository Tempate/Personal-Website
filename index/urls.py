from django.urls import re_path, include
from . import views

urlpatterns = [
    re_path(r'^$', views.home, name="home"),
    re_path(r'^project/direct=(?P<direct>.+)&name=(?P<name>.+)$', views.projects, name="projects"),
    re_path(r'^asymmetric-key/alg=(?P<alg>\w*)$', views.asymmetric, name="asymmetric"),
    re_path(r'^symmetric-key/$', views.symmetric, name="symmetric"),
    re_path(r'^hash/$', views.hash, name="hash")
]
