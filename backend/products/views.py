from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.http import HttpResponse
from django.template.loader import render_to_string
from weasyprint import HTML
from .models import Product
from backend.permissions import IsAdminOrReadOnly
from products.models import Product
from products.serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]


class ProductsPDFView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        products = Product.objects.all()
        html_string = render_to_string(
            "products-table-pdf.html", {"products": products}
        )

        pdf_file = HTML(string=html_string).write_pdf()

        response = HttpResponse(pdf_file, content_type="application/pdf")
        response["Content-Disposition"] = 'inline; filename="products.pdf"'
        return response
