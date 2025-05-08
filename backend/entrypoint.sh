#!/bin/bash

# Ejecuta las migraciones
python manage.py migrate --noinput

# Crea datos de prueba
python manage.py seed

# Luego ejecuta el servidor
exec "$@"