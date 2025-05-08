from django.core.mail import EmailMessage
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.http import HttpResponse
from products.pdf import generate_pdf_products
from .models import Product
from backend.permissions import IsAdminOrReadOnly
from products.models import Product
from products.serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework import status


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]


class ProductsPDFView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):

        pdf_file = generate_pdf_products(Product.objects.all())

        response = HttpResponse(pdf_file, content_type="application/pdf")
        response["Content-Disposition"] = 'inline; filename="products.pdf"'
        return response


class SendPDFEmailView(APIView):
    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response(
                {"detail": "Email is required"}, status=status.HTTP_400_BAD_REQUEST
            )
        try:
            products = Product.objects.all()
            pdf_file = generate_pdf_products(products)

            sender = EmailMessage(
                subject="Listado de productos",
                body="Adjunto encontrarás el listado de productos en PDF.",
                to=[email],
            )
            sender.attach("productos.pdf", pdf_file, "application/pdf")
            sender.send()
            return Response(
                {"detail": "Email sent successfully"}, status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
