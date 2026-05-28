-- Porsche Experience - PostgreSQL setup
-- Execute depois de criar/conectar no banco porsche_db.

CREATE TABLE IF NOT EXISTS porsche_models (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    tagline VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    badge VARCHAR(100),
    badge_class VARCHAR(50),
    imagem VARCHAR(255),
    potencia_base INTEGER NOT NULL,
    potencia_turbo INTEGER NOT NULL,
    velocidade_maxima DOUBLE PRECISION NOT NULL,
    aceleracao_zero_cem DOUBLE PRECISION NOT NULL,
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

CREATE TABLE IF NOT EXISTS cadastros (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100),
    email VARCHAR(160) NOT NULL UNIQUE,
    senha_hash VARCHAR(120) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(2),
    data_nascimento DATE,
    modelo_fav VARCHAR(120),
    obs TEXT,
    newsletter BOOLEAN NOT NULL DEFAULT false,
    data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS problem_reports (
    id BIGSERIAL PRIMARY KEY,
    porsche_model_id BIGINT NOT NULL,
    cadastro_id BIGINT,
    ano_veiculo INTEGER,
    km VARCHAR(30),
    categoria VARCHAR(80) NOT NULL,
    titulo VARCHAR(160) NOT NULL,
    descricao TEXT NOT NULL,
    solucao TEXT,
    email VARCHAR(160),
    severidade VARCHAR(20) NOT NULL DEFAULT 'Media',
    aprovado BOOLEAN NOT NULL DEFAULT true,
    data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_problem_model FOREIGN KEY (porsche_model_id) REFERENCES porsche_models(id) ON DELETE CASCADE,
    CONSTRAINT fk_problem_cadastro FOREIGN KEY (cadastro_id) REFERENCES cadastros(id) ON DELETE SET NULL
);

ALTER TABLE problem_reports DROP CONSTRAINT IF EXISTS uk_problem_report_model_title;

CREATE TABLE IF NOT EXISTS problem_replies (
    id BIGSERIAL PRIMARY KEY,
    problem_report_id BIGINT NOT NULL,
    autor VARCHAR(100) NOT NULL,
    mensagem TEXT NOT NULL,
    data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_reply_report FOREIGN KEY (problem_report_id) REFERENCES problem_reports(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS favorite_models (
    id BIGSERIAL PRIMARY KEY,
    cadastro_id BIGINT NOT NULL,
    porsche_model_id BIGINT NOT NULL,
    data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_favorite_cadastro_model UNIQUE (cadastro_id, porsche_model_id),
    CONSTRAINT fk_favorite_cadastro FOREIGN KEY (cadastro_id) REFERENCES cadastros(id) ON DELETE CASCADE,
    CONSTRAINT fk_favorite_model FOREIGN KEY (porsche_model_id) REFERENCES porsche_models(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_porsche_models_nome ON porsche_models(nome);
CREATE INDEX IF NOT EXISTS idx_porsche_models_ativo ON porsche_models(ativo);
CREATE INDEX IF NOT EXISTS idx_problem_reports_model ON problem_reports(porsche_model_id);
CREATE INDEX IF NOT EXISTS idx_problem_reports_cadastro ON problem_reports(cadastro_id);
CREATE INDEX IF NOT EXISTS idx_problem_replies_report ON problem_replies(problem_report_id);
CREATE INDEX IF NOT EXISTS idx_favorites_cadastro ON favorite_models(cadastro_id);

INSERT INTO porsche_models
(nome, tagline, descricao, badge, badge_class, imagem, potencia_base, potencia_turbo,
 velocidade_maxima, aceleracao_zero_cem, cambio, ano_lancamento, especificacoes,
 data_criacao, data_atualizacao, ativo)
VALUES
('Porsche 911', 'Icone',
 'Desde 1964, o 911 e a quintessencia do esportivo. Motor boxer traseiro, silhueta inconfundivel e evolucao constante.',
 'Icone', 'badge-icone', 'imagens/911.jpg', 385, 640, 318.00, 3.20, 'PDK', 1964,
 '{"specs":[{"valor":"385+","label":"CV Base"},{"valor":"640","label":"CV Turbo S"},{"valor":"60+","label":"Anos"}]}',
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true),
('Porsche Taycan', 'Eletrico',
 'O esportivo 100% eletrico da Porsche, com arquitetura de 800V e desempenho consistente.',
 'Eletrico', 'badge-eletrico', 'imagens/taycan.jpeg', 761, 761, 260.00, 2.80, '1 velocidade', 2019,
 '{"specs":[{"valor":"761cv","label":"Turbo S"},{"valor":"2.8s","label":"0-100 km/h"},{"valor":"800V","label":"Arquitetura"}]}',
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true),
('718 Cayman', 'Esportivo',
 'Motor central, equilibrio preciso e experiencia de conducao pura.',
 'Esportivo', 'badge-esportivo', 'imagens/cayman.jpg', 300, 400, 304.00, 3.40, 'PDK', 2016,
 '{"specs":[{"valor":"400cv","label":"GT4"},{"valor":"3.4s","label":"0-100 km/h"},{"valor":"304","label":"km/h"}]}',
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true),
('Porsche Panamera', 'Sedan',
 'Sedan executivo de alto desempenho que combina conforto e performance.',
 'Sedan', 'badge-sedan', 'imagens/panamera.jpg', 400, 700, 315.00, 3.20, 'PDK', 2009,
 '{"specs":[{"valor":"700cv","label":"Turbo S E-Hybrid"},{"valor":"3.2s","label":"0-100 km/h"},{"valor":"315","label":"km/h"}]}',
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true),
('718 Spyder RS', 'Esportivo',
 'Versao extrema e descoberta da linha 718, com motor aspirado de 500 cv.',
 'Esportivo', 'badge-esportivo', 'imagens/spyder.jpg', 500, 500, 309.00, 3.40, 'PDK', 2020,
 '{"specs":[{"valor":"500cv","label":"Aspirado"},{"valor":"3.4s","label":"0-100 km/h"},{"valor":"309","label":"km/h"}]}',
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true),
('Porsche Macan', 'SUV',
 'SUV compacto esportivo com praticidade para o dia a dia.',
 'SUV', 'badge-suv', 'imagens/macan.jpg', 261, 639, 260.00, 3.30, 'PDK', 2014,
 '{"specs":[{"valor":"639cv","label":"Eletrico"},{"valor":"3.3s","label":"0-100 km/h"},{"valor":"518","label":"km Autonomia"}]}',
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true)
ON CONFLICT (nome) DO UPDATE SET
  tagline = EXCLUDED.tagline,
  descricao = EXCLUDED.descricao,
  badge = EXCLUDED.badge,
  badge_class = EXCLUDED.badge_class,
  imagem = EXCLUDED.imagem,
  potencia_base = EXCLUDED.potencia_base,
  potencia_turbo = EXCLUDED.potencia_turbo,
  velocidade_maxima = EXCLUDED.velocidade_maxima,
  aceleracao_zero_cem = EXCLUDED.aceleracao_zero_cem,
  cambio = EXCLUDED.cambio,
  ano_lancamento = EXCLUDED.ano_lancamento,
  especificacoes = EXCLUDED.especificacoes,
  ativo = true,
  data_atualizacao = CURRENT_TIMESTAMP;

INSERT INTO problem_reports
(porsche_model_id, ano_veiculo, km, categoria, titulo, descricao, solucao, severidade, aprovado, data_criacao)
SELECT id, 2006, '80.000 km', 'Motor',
       'Vazamento de oleo nos selos do eixo intermediario (IMS)',
       'Problema comum em modelos 996 e 997.1, podendo causar vazamentos e danos ao motor.',
       'Inspecao preventiva e substituicao do rolamento IMS em oficina especializada.',
       'Alta', true, CURRENT_TIMESTAMP
FROM porsche_models WHERE nome = 'Porsche 911'
AND NOT EXISTS (
    SELECT 1
    FROM problem_reports pr
    WHERE pr.porsche_model_id = porsche_models.id
      AND pr.titulo = 'Vazamento de oleo nos selos do eixo intermediario (IMS)'
);
