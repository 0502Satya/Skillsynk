from django.db import connection
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

with connection.cursor() as cursor:
    # Get all tables
    cursor.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public'")
    tables = [row[0] for row in cursor.fetchall()]
    
    if not tables:
        print("No tables to drop.")
        exit()
        
    print(f"Dropping {len(tables)} tables...")
    # Generate DROP TABLE statements
    # We use CASCADE to handle foreign key dependencies
    drop_query = "DROP TABLE IF EXISTS " + ", ".join([f'"{t}"' for t in tables]) + " CASCADE;"
    cursor.execute(drop_query)
    print("Done.")
