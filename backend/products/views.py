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
from sklearn.linear_model import LinearRegression
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import make_pipeline
import pandas as pd


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


class PredictPriceView(APIView):
    permission_classes = [AllowAny]
    allowed_currencies = ["usd", "eur", "pen"]

    def post(self, request):
        product_name = request.data.get("name")
        product_features = request.data.get("features")
        product_currency = request.data.get("currency", "").lower()

        if not product_name or not product_features:
            return Response(
                {
                    "detail": "El nombre y las características del producto son obligatorios"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if product_currency not in self.allowed_currencies:
            return Response(
                {"detail": "La moneda no es válida"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if product_currency == "usd":
            price_field = "price_usd"
        elif product_currency == "eur":
            price_field = "price_eur"
        else:
            price_field = "price_pen"

        try:
            products = Product.objects.all()
            if products.count() < 5:
                return Response(
                    {
                        "detail": "Necesitas registrar al menos 5 productos para hacer una predicción"
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            df = pd.DataFrame(list(products.values("name", "features", price_field)))

            df["text"] = df["name"] + " " + df["features"]
            X = df["text"]
            y = df[price_field]

            model = make_pipeline(TfidfVectorizer(), LinearRegression())
            model.fit(X, y)

            input_data = [product_name + " " + product_features]
            predicted_price = model.predict(input_data)[0]
            return Response(
                {"predicted_price": predicted_price},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
