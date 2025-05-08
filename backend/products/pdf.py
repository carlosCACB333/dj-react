from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from weasyprint import HTML
from products.models import Product


def generate_pdf_products(products: list[Product]) -> bytes:
    html_string = render_to_string("products-table-pdf.html", {"products": products})
    pdf_file = HTML(string=html_string).write_pdf()
    return pdf_file
