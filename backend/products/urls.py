from django.urls import path, include
from rest_framework.routers import DefaultRouter
from products.views import ProductViewSet, ProductsPDFView, SendPDFEmailView

router = DefaultRouter()
router.register(r"", ProductViewSet, basename="product")

urlpatterns = [
    path("pdf", ProductsPDFView.as_view(), name="products-pdf"),
    path("pdf/send", SendPDFEmailView.as_view(), name="send-products-pdf"),
    path("", include(router.urls)),
]
