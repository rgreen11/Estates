from django.http import HttpResponse

def hello_world(request):
    return HttpResponse("Give more to the World!")
# Create your views here.
