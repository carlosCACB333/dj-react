from rest_framework import serializers
from companies.models import Company
from companies.serializers import CompanySerializer
from products.models import Product


class ProductSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    company_id = serializers.PrimaryKeyRelatedField(
        queryset=Company.objects.all(), source="company", write_only=True
    )

    class Meta:
        model = Product
        fields = "__all__"
