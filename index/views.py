from django.shortcuts import render

# Create your views here.

def home(request):
    return render(request, "index/home.html")

def projects(request, direct, name):
    return render(request, "%s/%s.html" % (direct, name))
