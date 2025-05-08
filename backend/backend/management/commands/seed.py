from calendar import c
from django.core.management.base import BaseCommand

from companies.models import Company
from products.models import Product


class Command(BaseCommand):
    help = "Inserta datos iniciales"

    def handle(self, *args, **kwargs):

        company1, _ = Company.objects.get_or_create(
            nit="20123456789",
            defaults={
                "name": "TechCorp",
                "address": "Av. Grau 123",
                "phone": "987654321",
            },
        )

        products = [
            {
                "code": "P001",
                "name": "Smartphone X",
                "features": "128GB, 6GB RAM, Dual SIM, 5G",
                "price_usd": 500.00,
                "price_eur": 460.00,
                "price_pen": 1900.00,
            },
            {
                "code": "P002",
                "name": "Smartphone Y",
                "features": "64GB, 4GB RAM, LTE, NFC",
                "price_usd": 300.00,
                "price_eur": 280.00,
                "price_pen": 1150.00,
            },
            {
                "code": "P003",
                "name": "Smartphone Z Pro",
                "features": "256GB, 8GB RAM, 5G, Cámara 108MP",
                "price_usd": 750.00,
                "price_eur": 700.00,
                "price_pen": 2900.00,
            },
            {
                "code": "P004",
                "name": "Smartphone Lite",
                "features": "32GB, 3GB RAM, HD Display",
                "price_usd": 150.00,
                "price_eur": 140.00,
                "price_pen": 580.00,
            },
            {
                "code": "P005",
                "name": "Laptop Pro 15",
                "features": "Intel i7, 16GB RAM, 512GB SSD",
                "price_usd": 1200.00,
                "price_eur": 1100.00,
                "price_pen": 4600.00,
            },
            {
                "code": "P006",
                "name": "Laptop Air 13",
                "features": "Intel i5, 8GB RAM, 256GB SSD",
                "price_usd": 950.00,
                "price_eur": 890.00,
                "price_pen": 3650.00,
            },
            {
                "code": "P007",
                "name": "Laptop Gamer Beast",
                "features": "Ryzen 7, RTX 3060, 32GB RAM, 1TB SSD",
                "price_usd": 1800.00,
                "price_eur": 1700.00,
                "price_pen": 6900.00,
            },
            {
                "code": "P008",
                "name": "Laptop Básica 14",
                "features": "Celeron, 4GB RAM, 128GB eMMC",
                "price_usd": 320.00,
                "price_eur": 300.00,
                "price_pen": 1230.00,
            },
            {
                "code": "P009",
                "name": "Ultrabook Elite",
                "features": "Intel i9, 32GB RAM, 1TB SSD, Touch",
                "price_usd": 2100.00,
                "price_eur": 1980.00,
                "price_pen": 8100.00,
            },
            {
                "code": "P010",
                "name": "Laptop Estudiantil",
                "features": "AMD Athlon, 8GB RAM, 256GB SSD",
                "price_usd": 450.00,
                "price_eur": 420.00,
                "price_pen": 1750.00,
            },
        ]

        for p in products:
            Product.objects.get_or_create(
                code=p["code"], defaults={**p, "company": company1}
            )

        self.stdout.write(
            self.style.SUCCESS("Datos iniciales insertados correctamente")
        )
