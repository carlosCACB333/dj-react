from rest_framework import viewsets
from companies.models import Company
from companies.serializers import CompanySerializer
from backend.permissions import IsAdminOrReadOnly


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAdminOrReadOnly]
