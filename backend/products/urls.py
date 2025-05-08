from django.urls import path, include
from rest_framework.routers import DefaultRouter
from products.views import ProductViewSet, ProductsPDFView

router = DefaultRouter()
router.register(r"", ProductViewSet, basename="product")

urlpatterns = [
    path("pdf", ProductsPDFView.as_view(), name="products-pdf"),
    path("", include(router.urls)),
]
