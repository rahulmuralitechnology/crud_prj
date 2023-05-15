from django.contrib import admin
from .models import todo

class Todo(admin.ModelAdmin):
    list_display = ('id', 'title', 'date')

# Register your models here.

admin.site.register(todo, Todo)