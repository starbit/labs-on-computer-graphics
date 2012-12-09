# -*- coding: utf-8 -*-

from django.template.response import TemplateResponse
from django.template import RequestContext,Template, Context
from django.template.loader import get_template


def lab5(request):
    return TemplateResponse(request,'lab5.html')