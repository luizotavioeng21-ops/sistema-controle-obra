-- =====================================================
-- Dados de Exemplo - Sistema de Controle de Obra
-- =====================================================

-- Inserir Vereadores (conforme imagem)
INSERT INTO vereadores (nome, ativo) VALUES
('WERITON', true),
('DOM DOM', true),
('MACHADO', true),
('FERNANDO', true);

-- Inserir Tipos de Obra
INSERT INTO tipos_obra (nome, descricao) VALUES
('PAVIMENTAÇÃO', 'Obras de pavimentação de ruas e avenidas'),
('REFORMA DE PONTE', 'Reforma e manutenção de pontes'),
('MURO GABIÃO', 'Construção de muros de contenção com gabião');

-- Inserir Recursos (Fontes de Financiamento)
INSERT INTO recursos (nome, descricao, ativo) VALUES
('ESTADUAL', 'Recursos provenientes do governo estadual', true),
('FEDERAL', 'Recursos provenientes do governo federal', true);

-- Inserir Fontes de Financiamento (valores da imagem)
INSERT INTO fontes (valor, descricao) VALUES
(1706000, 'Fonte 1.706.000'),
(1708000, 'Fonte 1.708.000'),
(1710000, 'Fonte 1.710.000');

-- Inserir Endereços
INSERT INTO enderecos (rua, numero, bairro, cidade, estado, cep) VALUES
('RUA 10', '', 'Centro', 'Município', 'MG', '00000-000'),
('TRAVESSA CARMINDO', 'TR 01', 'Centro', 'Município', 'MG', '00000-000'),
('RUA JOÃO PAULO', '', 'Centro', 'Município', 'MG', '00000-000'),
('RUA CARLOS GRACIO', '', 'Centro', 'Município', 'MG', '00000-000'),
('TRAVESSA CARMINDO', 'TR 02', 'Centro', 'Município', 'MG', '00000-000'),
('RIO DAS MORTES', '', 'Centro', 'Município', 'MG', '00000-000'),
('GAMELEIRA', '', 'Centro', 'Município', 'MG', '00000-000'),
('GAMELEIRA', 'TR 01', 'Centro', 'Município', 'MG', '00000-000'),
('GAMELEIRA', 'TR 02', 'Centro', 'Município', 'MG', '00000-000'),
('GAMELEIRA', 'TR 03', 'Centro', 'Município', 'MG', '00000-000'),
('ESTRADA VICINAL MORRO DOS VENTOS II', '', 'Centro', 'Município', 'MG', '00000-000'),
('OTÁVIO SOARES (RECONDENGO)', '', 'Centro', 'Município', 'MG', '00000-000'),
('DOMINGOS GAIO', '', 'Centro', 'Município', 'MG', '00000-000'),
('ALAMEDA PAU BRASIL', '', 'Centro', 'Município', 'MG', '00000-000'),
('ANTÔNIO DAVIN', '', 'Centro', 'Município', 'MG', '00000-000'),
('PROFESSOR RIBEIRO CAMPOS', '', 'Centro', 'Município', 'MG', '00000-000'),
('MIGUEL RANDI', '', 'Centro', 'Município', 'MG', '00000-000'),
('TRAVESSA CARMELIO RUBENS', '', 'Centro', 'Município', 'MG', '00000-000');

-- Inserir Obras para WERITON
INSERT INTO obras (vereador_id, endereco_id, tipo_obra_id, andamento, aditivo, status, descricao) VALUES
(1, 1, 1, 'EM ANDAMENTO', 0, 'ATIVO', 'Pavimentação RUA 10'),
(1, 2, 1, 'EM ANDAMENTO', 0, 'ATIVO', 'Pavimentação TRAVESSA CARMINDO TR 01'),
(1, 3, 1, 'EM ANDAMENTO', 0, 'ATIVO', 'Pavimentação RUA JOÃO PAULO'),
(1, 4, 1, 'EM ANDAMENTO', 0, 'ATIVO', 'Pavimentação RUA CARLOS GRACIO'),
(1, 5, 1, 'EM ANDAMENTO', 0, 'ATIVO', 'Pavimentação TRAVESSA CARMINDO TR 02');

-- Inserir Obras para DOM DOM
INSERT INTO obras (vereador_id, endereco_id, tipo_obra_id, andamento, aditivo, status, descricao) VALUES
(2, 6, 2, 'EM ANDAMENTO', 0, 'ATIVO', 'Reforma de Ponte - RIO DAS MORTES'),
(2, 7, 2, 'EM ANDAMENTO', 0, 'ATIVO', 'Reforma de Ponte - GAMELEIRA'),
(2, 8, 3, 'EM ANDAMENTO', 43767.82, 'ATIVO', 'Muro Gabião - GAMELEIRA TR 01'),
(2, 9, 3, 'EM ANDAMENTO', 0, 'ATIVO', 'Muro Gabião - GAMELEIRA TR 02'),
(2, 10, 3, 'EM ANDAMENTO', 0, 'ATIVO', 'Muro Gabião - GAMELEIRA TR 03');

-- Inserir Obras para MACHADO
INSERT INTO obras (vereador_id, endereco_id, tipo_obra_id, andamento, aditivo, status, descricao) VALUES
(3, 11, 1, 'EM ANDAMENTO', 0, 'ATIVO', 'Pavimentação ESTRADA VICINAL MORRO DOS VENTOS II');

-- Inserir Obras para FERNANDO
INSERT INTO obras (vereador_id, endereco_id, tipo_obra_id, andamento, aditivo, status, descricao) VALUES
(4, 12, 1, 'EM ANDAMENTO', 0, 'ATIVO', 'Pavimentação OTÁVIO SOARES'),
(4, 13, 1, 'EM ANDAMENTO', 0, 'ATIVO', 'Pavimentação DOMINGOS GAIO'),
(4, 14, 1, 'EM ANDAMENTO', 0, 'ATIVO', 'Pavimentação ALAMEDA PAU BRASIL'),
(4, 15, 1, 'EM ANDAMENTO', 0, 'ATIVO', 'Pavimentação ANTÔNIO DAVIN'),
(4, 16, 1, 'EM ANDAMENTO', 0, 'ATIVO', 'Pavimentação PROFESSOR RIBEIRO CAMPOS'),
(4, 17, 1, 'EM ANDAMENTO', 0, 'ATIVO', 'Pavimentação MIGUEL RANDI'),
(4, 18, 1, 'EM ANDAMENTO', 0, 'ATIVO', 'Pavimentação TRAVESSA CARMELIO RUBENS');

-- Inserir Recursos das Obras WERITON
INSERT INTO obra_recursos (obra_id, recurso_id, valor_recurso, valor_obra, valor_complementar, fonte_id) VALUES
(1, 1, 300000.00, 97194.52, 0, 1),
(1, 1, 300000.00, 210863.90, 0, 1),
(2, 1, 390000.00, 183082.22, 0, 1),
(2, 1, 390000.00, 139923.34, 0, 1),
(2, 1, 390000.00, 66994.43, 0, 1),
(3, 2, 800000.00, 135361.12, 0, 2),
(4, 2, 800000.00, 185812.83, 0, 2),
(4, 2, 800000.00, 93724.25, 120820.50, 2),
(4, 2, 800000.00, 150027.95, 0, 2),
(4, 2, 800000.00, 99310.53, 0, 2),
(4, 2, 800000.00, 256583.82, 0, 2);

-- Inserir Recursos das Obras MACHADO
INSERT INTO obra_recursos (obra_id, recurso_id, valor_recurso, valor_obra, valor_complementar, fonte_id) VALUES
(6, 1, 300000.00, 523248.54, 223248.54, 1),
(6, 1, 300000.00, 0, 0, 1),
(6, 1, 300000.00, 0, 0, 1);

-- Inserir Recursos das Obras FERNANDO
INSERT INTO obra_recursos (obra_id, recurso_id, valor_recurso, valor_obra, valor_complementar, fonte_id) VALUES
(7, 1, 300628.00, 280653.36, 0, 1),
(7, 1, 300628.00, 18437.79, 0, 1),
(8, 1, 300000.00, 110081.80, 0, 1),
(9, 1, 300000.00, 125556.07, 0, 1),
(10, 2, 300000.00, 103758.32, 0, 2),
(10, 2, 300000.00, 184078.53, 0, 2),
(11, 2, 300000.00, 33560.22, 0, 2);

-- Inserir Usuários
INSERT INTO usuarios (nome, email, senha_hash, tipo_usuario, ativo) VALUES
('Admin', 'admin@obra.com', '$2b$10$4GvXwOHZqTfGtdkKXgS0suUK8ZJvQNe9FeKvh3VFJ6SVGxGiDu3aS', 'ADMINISTRADOR', true),
('Gestor', 'gestor@obra.com', '$2b$10$4GvXwOHZqTfGtdkKXgS0suUK8ZJvQNe9FeKvh3VFJ6SVGxGiDu3aS', 'GESTOR', true),
('Visualizador', 'visualizador@obra.com', '$2b$10$4GvXwOHZqTfGtdkKXgS0suUK8ZJvQNe9FeKvh3VFJ6SVGxGiDu3aS', 'VISUALIZADOR', true);

-- =====================================================
-- FIM DOS DADOS
-- =====================================================
