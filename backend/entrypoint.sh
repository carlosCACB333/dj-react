#!/bin/bash

# Ejecuta las migraciones
python manage.py migrate --noinput

# Luego ejecuta el servidor
exec "$@"