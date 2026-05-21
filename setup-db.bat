@echo off
REM Script para setup do banco de dados PostgreSQL no Windows
REM Requisitos: PostgreSQL 15+ instalado, psql no PATH

echo ========================================
echo Porsche Experience - Database Setup
echo ========================================
echo.

setlocal enabledelayedexpansion

REM Verificar se psql está instalado
where psql >nul 2>nul
if errorlevel 1 (
    echo ERRO: psql nao encontrado. 
    echo Verifique se PostgreSQL esta instalado e no PATH.
    echo.
    echo Locais comuns:
    echo   C:\Program Files\PostgreSQL\15\bin
    echo   C:\Program Files (x86)\PostgreSQL\15\bin
    pause
    exit /b 1
)

echo [1] Criando banco de dados...
psql -U postgres -c "CREATE DATABASE porsche_db ENCODING 'UTF8';" 2>nul
if errorlevel 1 (
    echo AVISO: Banco pode ja existir. Continuando...
)

echo [2] Executando script SQL...
psql -U postgres -d porsche_db -f database/init.sql
if errorlevel 1 (
    echo ERRO: Falha ao executar script SQL
    pause
    exit /b 1
)

echo [3] Verificando dados...
for /f "tokens=*" %%a in ('psql -U postgres -d porsche_db -t -c "SELECT COUNT(*) FROM porsche_models;"') do set COUNT=%%a

echo.
echo ========================================
echo Sucesso! Banco criado com %COUNT% modelos.
echo ========================================
echo.
echo Proximas steps:
echo 1. Abra outro terminal e rode: cd backend ^&^& mvn spring-boot:run
echo 2. Abra outro terminal e rode: npm run dev
echo 3. Acesse: http://localhost:5173
echo.
pause
