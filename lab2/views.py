# -*- coding: utf-8 -*-

from django.template.response import TemplateResponse
from django.template import RequestContext,Template, Context
from django.template.loader import get_template


def lab2(request):
    return TemplateResponse(request,'lab2.html')