from django.db import models

from companies.models import Company


class Product(models.Model):
    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    features = models.TextField()
    price_usd = models.DecimalField(max_digits=10, decimal_places=2)
    price_eur = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    price_pen = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    company = models.ForeignKey(
        Company, related_name="products", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name
