-- ============================================================
-- Script de criação do banco de dados Porsche Experience
-- Banco: PostgreSQL
-- ============================================================

-- Criar banco de dados (executar com superusuário)
-- CREATE DATABASE porsche_db ENCODING 'UTF8';

-- Conectar ao banco porsche_db antes de executar o resto

-- ============================================================
-- Tabela: porsche_models
-- ============================================================
CREATE TABLE IF NOT EXISTS porsche_models (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    tagline VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    badge VARCHAR(100),
    badge_class VARCHAR(50),
    imagem VARCHAR(255),
    potencia_base INTEGER NOT NULL,
    potencia_turbo INTEGER NOT NULL,
    velocidade_maxima DECIMAL(5,2) NOT NULL,
    aceleracao_zero_cem DECIMAL(5,2) NOT NULL,
    cambio VARCHAR(50),
    ano_lancamento INTEGER NOT NULL,
    especificacoes TEXT,
    problemas TEXT,
    faq TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT true,
    CONSTRAINT check_potencia CHECK (potencia_base > 0 AND potencia_turbo > 0)
);

-- ============================================================
-- Índices para melhor performance
-- ============================================================
CREATE INDEX idx_porsche_models_nome ON porsche_models(nome);
CREATE INDEX idx_porsche_models_ativo ON porsche_models(ativo);
CREATE INDEX idx_porsche_models_ano_lancamento ON porsche_models(ano_lancamento);

-- ============================================================
-- Dados iniciais - Modelos Porsche
-- ============================================================

-- 911
INSERT INTO porsche_models 
(nome, tagline, descricao, badge, badge_class, imagem, potencia_base, potencia_turbo, 
 velocidade_maxima, aceleracao_zero_cem, cambio, ano_lancamento, especificacoes, ativo)
VALUES (
    'Porsche 911',
    'Icone',
    'Desde 1964, o 911 é a quintessência do esportivo. Motor boxer traseiro, silhueta inconfundível e uma evolução constante que jamais perde a essência original. De 385 cv a 640 cv na linha Turbo S, o 911 representa mais de 60 anos de engenharia alemã de precisão.',
    'Icone',
    'badge-icone',
    'imagens/911.jpg',
    385,
    640,
    318.00,
    3.20,
    'PDK',
    1964,
    '{"specs": ["385 CV Base", "640 CV Turbo S", "3.2s 0-100 km/h", "318 km/h Vel. Max", "PDK", "60 Anos de historia"]}',
    true
);

-- Taycan
INSERT INTO porsche_models 
(nome, tagline, descricao, badge, badge_class, imagem, potencia_base, potencia_turbo, 
 velocidade_maxima, aceleracao_zero_cem, cambio, ano_lancamento, especificacoes, ativo)
VALUES (
    'Porsche Taycan',
    'Elétrico',
    'O esportivo 100% elétrico da Porsche. Com até 761 cv na versão Turbo S e arquitetura de 800V para carregamento ultrarrápido, o Taycan redefine o que um carro elétrico pode ser. Desempenho consistente, sem compromisso.',
    'Elétrico',
    'badge-eletrico',
    'imagens/taycan.jpeg',
    761,
    761,
    260.00,
    2.80,
    'De 1-velocidade',
    2019,
    '{"specs": ["761 CV Turbo S", "2.8s 0-100 km/h", "260 km/h Vel. Máx.", "800V Arquitetura", "500+ km Autonomia", "22min 10-80% carga"]}',
    true
);

-- 718 Cayman
INSERT INTO porsche_models 
(nome, tagline, descricao, badge, badge_class, imagem, potencia_base, potencia_turbo, 
 velocidade_maxima, aceleracao_zero_cem, cambio, ano_lancamento, especificacoes, ativo)
VALUES (
    '718 Cayman',
    'Esportivo',
    'Motor central, equilíbrio perfeito e precisão absoluta. O 718 Cayman oferece a experiência de condução mais pura da linha Porsche. Versões até 400 cv na configuração GT4, com foco total na conexão piloto-máquina.',
    'Esportivo',
    'badge-esportivo',
    'imagens/cayman.jpg',
    300,
    400,
    304.00,
    3.40,
    'PDK',
    2016,
    '{"specs": ["300 CV Base", "400 CV GT4", "3.4s 0-100 km/h", "304 km/h Vel. Máx.", "Motor Central", "Mid-Engine"]}',
    true
);

-- Panamera
INSERT INTO porsche_models 
(nome, tagline, descricao, badge, badge_class, imagem, potencia_base, potencia_turbo, 
 velocidade_maxima, aceleracao_zero_cem, cambio, ano_lancamento, especificacoes, ativo)
VALUES (
    'Porsche Panamera',
    'Sedan',
    'O sedan executivo de alto desempenho da Porsche. Combina o conforto de um Gran Turismo com performance de superesportivo. Disponível em versões híbridas plug-in com até 700 cv, redefinindo o que uma berlina esportiva pode oferecer.',
    'Sedan',
    'badge-sedan',
    'imagens/panamera.jpg',
    400,
    700,
    315.00,
    3.20,
    'PDK',
    2009,
    '{"specs": ["700 CV Turbo S E-Hybrid", "3.2s 0-100 km/h", "315 km/h Vel. Máx.", "PDK 8-velocidades", "Sedan 4-portas", "PHEV Híbrido"]}',
    true
);

-- 718 Spyder RS
INSERT INTO porsche_models 
(nome, tagline, descricao, badge, badge_class, imagem, potencia_base, potencia_turbo, 
 velocidade_maxima, aceleracao_zero_cem, cambio, ano_lancamento, especificacoes, ativo)
VALUES (
    '718 Spyder RS',
    'Esportivo',
    'A versão mais extrema e descoberta da linha 718. Com motor aspirado de 500 cv derivado do GT3, o Spyder RS é a essência da condução ao ar livre levada ao limite. Produção limitada para os mais dedicados entusiastas.',
    'Esportivo',
    'badge-esportivo',
    'imagens/spyder.jpg',
    500,
    500,
    309.00,
    3.40,
    'PDK',
    2020,
    '{"specs": ["500 CV Aspirado", "3.4s 0-100 km/h", "309 km/h Vel. Máx.", "Motor Central", "Conversível", "Produção Limitada"]}',
    true
);

-- Macan
INSERT INTO porsche_models 
(nome, tagline, descricao, badge, badge_class, imagem, potencia_base, potencia_turbo, 
 velocidade_maxima, aceleracao_zero_cem, cambio, ano_lancamento, especificacoes, ativo)
VALUES (
    'Porsche Macan',
    'SUV',
    'O SUV compacto mais esportivo do mundo. Agora disponível em versão 100% elétrica, o Macan combina praticidade de SUV com dinâmica de condução que envergonha muitos esportivos. Perfeito para o dia a dia sem abrir mão da emoção.',
    'SUV',
    'badge-suv',
    'imagens/macan.jpg',
    261,
    639,
    260.00,
    3.30,
    'PDK',
    2014,
    '{"specs": ["261 CV Base", "639 CV Elétrico", "3.3s 0-100 km/h", "260 km/h Vel. Máx.", "800V Arquitetura", "518 km Autonomia"]}',
    true
);

-- ============================================================
-- Exibir dados inseridos
-- ============================================================
SELECT id, nome, tagline, potencia_base, potencia_turbo, ano_lancamento, ativo 
FROM porsche_models 
ORDER BY ano_lancamento DESC;

-- ============================================================
-- Verificar estrutura da tabela
-- ============================================================
\d porsche_models
