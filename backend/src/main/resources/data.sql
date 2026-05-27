INSERT INTO porsche_models
(nome, tagline, descricao, badge, badge_class, imagem, potencia_base, potencia_turbo,
 velocidade_maxima, aceleracao_zero_cem, cambio, ano_lancamento, especificacoes,
 data_criacao, data_atualizacao, ativo)
VALUES
('Porsche 911', 'Icone',
 'Desde 1964, o 911 e a quintessencia do esportivo. Motor boxer traseiro, silhueta inconfundivel e uma evolucao constante que jamais perde a essencia original.',
 'Icone', 'badge-icone', 'imagens/911.jpg', 385, 640, 318.00, 3.20, 'PDK', 1964,
 '{"specs":[{"valor":"385+","label":"CV Base"},{"valor":"640","label":"CV Turbo S"},{"valor":"60+","label":"Anos"}]}',
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true),
('Porsche Taycan', 'Eletrico',
 'O esportivo 100% eletrico da Porsche. Com ate 761 cv na versao Turbo S e arquitetura de 800V para carregamento ultrarrapido, o Taycan redefine o que um carro eletrico pode ser.',
 'Eletrico', 'badge-eletrico', 'imagens/taycan.jpeg', 761, 761, 260.00, 2.80, '1 velocidade', 2019,
 '{"specs":[{"valor":"761cv","label":"Turbo S"},{"valor":"2.8s","label":"0-100 km/h"},{"valor":"800V","label":"Arquitetura"}]}',
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true),
('718 Cayman', 'Esportivo',
 'Motor central, equilibrio perfeito e precisao absoluta. O 718 Cayman oferece a experiencia de conducao mais pura da linha Porsche.',
 'Esportivo', 'badge-esportivo', 'imagens/cayman.jpg', 300, 400, 304.00, 3.40, 'PDK', 2016,
 '{"specs":[{"valor":"400cv","label":"GT4"},{"valor":"3.4s","label":"0-100 km/h"},{"valor":"304","label":"km/h"}]}',
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true),
('Porsche Panamera', 'Sedan',
 'O sedan executivo de alto desempenho da Porsche. Combina o conforto de um Gran Turismo com performance de superesportivo.',
 'Sedan', 'badge-sedan', 'imagens/panamera.jpg', 400, 700, 315.00, 3.20, 'PDK', 2009,
 '{"specs":[{"valor":"700cv","label":"Turbo S E-Hybrid"},{"valor":"3.2s","label":"0-100 km/h"},{"valor":"315","label":"km/h"}]}',
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true),
('718 Spyder RS', 'Esportivo',
 'A versao mais extrema e descoberta da linha 718. Com motor aspirado de 500 cv derivado do GT3, o Spyder RS e a essencia da conducao ao ar livre levada ao limite.',
 'Esportivo', 'badge-esportivo', 'imagens/spyder.jpg', 500, 500, 309.00, 3.40, 'PDK', 2020,
 '{"specs":[{"valor":"500cv","label":"Aspirado"},{"valor":"3.4s","label":"0-100 km/h"},{"valor":"309","label":"km/h"}]}',
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true),
('Porsche Macan', 'SUV',
 'O SUV compacto mais esportivo do mundo. O Macan combina praticidade de SUV com dinamica de conducao esportiva para o dia a dia.',
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
       'Vazamento de óleo nos selos do eixo intermediário (IMS)',
       'Problema comum em modelos 996 e 997.1. O rolamento do eixo intermediário pode falhar, causando vazamentos e, em casos extremos, danos ao motor.',
       'Inspeção preventiva e substituição do rolamento IMS em oficina especializada.',
       'Alta', true, CURRENT_TIMESTAMP
FROM porsche_models WHERE nome = 'Porsche 911'
ON CONFLICT (porsche_model_id, titulo) DO UPDATE SET
  descricao = EXCLUDED.descricao,
  solucao = EXCLUDED.solucao,
  severidade = EXCLUDED.severidade,
  aprovado = true;

INSERT INTO problem_reports
(porsche_model_id, ano_veiculo, km, categoria, titulo, descricao, solucao, severidade, aprovado, data_criacao)
SELECT id, 2021, '22.000 km', 'Suspensão',
       'Ruído anormal na suspensão traseira em baixas velocidades',
       'Relatado em unidades iniciais. O ruído costuma aparecer em piso irregular e manobras lentas.',
       'Atualização de componentes conforme boletim técnico e revisão em concessionária.',
       'Baixa', true, CURRENT_TIMESTAMP
FROM porsche_models WHERE nome = 'Porsche Taycan'
ON CONFLICT (porsche_model_id, titulo) DO UPDATE SET
  descricao = EXCLUDED.descricao,
  solucao = EXCLUDED.solucao,
  severidade = EXCLUDED.severidade,
  aprovado = true;

INSERT INTO problem_reports
(porsche_model_id, ano_veiculo, km, categoria, titulo, descricao, solucao, severidade, aprovado, data_criacao)
SELECT id, 2018, '45.000 km', 'Motor',
       'Vibração no motor 2.0T em baixas rotações',
       'Alguns proprietários relatam vibração perceptível entre 1.500 e 2.000 rpm.',
       'Verificar coxins, suportes do motor e atualização de calibração.',
       'Baixa', true, CURRENT_TIMESTAMP
FROM porsche_models WHERE nome = '718 Cayman'
ON CONFLICT (porsche_model_id, titulo) DO UPDATE SET
  descricao = EXCLUDED.descricao,
  solucao = EXCLUDED.solucao,
  severidade = EXCLUDED.severidade,
  aprovado = true;

INSERT INTO problem_reports
(porsche_model_id, ano_veiculo, km, categoria, titulo, descricao, solucao, severidade, aprovado, data_criacao)
SELECT id, 2016, '52.000 km', 'Freios',
       'Desgaste prematuro dos freios dianteiros',
       'Modelos usados intensamente em cidade podem apresentar desgaste acelerado dos discos e pastilhas dianteiras.',
       'Monitorar espessura nas revisões e usar componentes compatíveis com o uso do veículo.',
       'Média', true, CURRENT_TIMESTAMP
FROM porsche_models WHERE nome = 'Porsche Macan'
ON CONFLICT (porsche_model_id, titulo) DO UPDATE SET
  descricao = EXCLUDED.descricao,
  solucao = EXCLUDED.solucao,
  severidade = EXCLUDED.severidade,
  aprovado = true;

INSERT INTO problem_reports
(porsche_model_id, ano_veiculo, km, categoria, titulo, descricao, solucao, severidade, aprovado, data_criacao)
SELECT id, 2014, '86.000 km', 'Motor',
       'Vazamento de óleo no motor V8',
       'Modelos mais antigos com motor V8 podem apresentar vazamentos nos retentores após alta quilometragem.',
       'Inspeção detalhada do conjunto do virabrequim e substituição dos retentores afetados.',
       'Alta', true, CURRENT_TIMESTAMP
FROM porsche_models WHERE nome = 'Porsche Panamera'
ON CONFLICT (porsche_model_id, titulo) DO UPDATE SET
  descricao = EXCLUDED.descricao,
  solucao = EXCLUDED.solucao,
  severidade = EXCLUDED.severidade,
  aprovado = true;

INSERT INTO problem_reports
(porsche_model_id, ano_veiculo, km, categoria, titulo, descricao, solucao, severidade, aprovado, data_criacao)
SELECT id, 2024, '3.000 km', 'Carroceria',
       'Capota manual de operação complexa',
       'A capota soft-top requer operação manual e pode ser trabalhosa sob chuva.',
       'Treinar o processo em ambiente seco e manter o mecanismo limpo e ajustado.',
       'Baixa', true, CURRENT_TIMESTAMP
FROM porsche_models WHERE nome = '718 Spyder RS'
ON CONFLICT (porsche_model_id, titulo) DO UPDATE SET
  descricao = EXCLUDED.descricao,
  solucao = EXCLUDED.solucao,
  severidade = EXCLUDED.severidade,
  aprovado = true;
