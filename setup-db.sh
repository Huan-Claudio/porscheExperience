#!/bin/bash
# Script para setup do banco de dados PostgreSQL em Linux/Mac
# Requisitos: PostgreSQL 15+ instalado

echo "========================================"
echo "Porsche Experience - Database Setup"
echo "========================================"
echo ""

# Verificar se psql está instalado
if ! command -v psql &> /dev/null; then
    echo "ERRO: psql não encontrado."
    echo "Instale PostgreSQL:"
    echo "  Mac: brew install postgresql@15"
    echo "  Linux: sudo apt-get install postgresql-15"
    exit 1
fi

echo "[1] Criando banco de dados..."
psql -U postgres -c "CREATE DATABASE porsche_db ENCODING 'UTF8';" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "AVISO: Banco pode já existir. Continuando..."
fi

echo "[2] Executando script SQL..."
psql -U postgres -d porsche_db -f database/init.sql
if [ $? -ne 0 ]; then
    echo "ERRO: Falha ao executar script SQL"
    exit 1
fi

echo "[3] Verificando dados..."
COUNT=$(psql -U postgres -d porsche_db -t -c "SELECT COUNT(*) FROM porsche_models;")

echo ""
echo "========================================"
echo "✓ Sucesso! Banco criado com $COUNT modelos."
echo "========================================"
echo ""
echo "Próximas steps:"
echo "1. Abra outro terminal e rode: cd backend && mvn spring-boot:run"
echo "2. Abra outro terminal e rode: npm run dev"
echo "3. Acesse: http://localhost:5173"
echo ""
