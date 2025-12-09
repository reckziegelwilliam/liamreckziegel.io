cat > /tmp/run-migrations.sh << 'EOF'
#!/bin/bash
echo "This script will run database migrations on your production database"
echo ""

echo "Running migrate-blog.sql..."
psql "$POSTGRES_URL" < scripts/migrate-blog.sql
echo ""
echo "Running migrate-admin-features.sql..."
psql "$POSTGRES_URL" < scripts/migrate-admin-features.sql
echo ""
echo "✅ Migrations complete!"
EOF
chmod +x /tmp/run-migrations.sh
echo "Script created at /tmp/run-migrations.sh"