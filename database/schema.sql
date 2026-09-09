-- =====================================================
-- Sistema de Controle de Obra
-- Schema Database PostgreSQL
-- =====================================================

-- Tabela de Vereadores
CREATE TABLE vereadores (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL UNIQUE,
  ativo BOOLEAN DEFAULT true,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Endereços
CREATE TABLE enderecos (
  id SERIAL PRIMARY KEY,
  rua VARCHAR(255) NOT NULL,
  numero VARCHAR(10),
  complemento VARCHAR(255),
  bairro VARCHAR(100),
  cidade VARCHAR(100) NOT NULL,
  estado VARCHAR(2) NOT NULL,
  cep VARCHAR(9),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Tipos de Obra
CREATE TABLE tipos_obra (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL UNIQUE,
  descricao TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Recursos (Tipos de Financiamento)
CREATE TABLE recursos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL UNIQUE,
  descricao TEXT,
  ativo BOOLEAN DEFAULT true,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Fontes de Financiamento
CREATE TABLE fontes (
  id SERIAL PRIMARY KEY,
  valor DECIMAL(15, 2) NOT NULL,
  descricao TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela Principal de Obras
CREATE TABLE obras (
  id SERIAL PRIMARY KEY,
  vereador_id INTEGER NOT NULL REFERENCES vereadores(id) ON DELETE CASCADE,
  endereco_id INTEGER NOT NULL REFERENCES enderecos(id) ON DELETE CASCADE,
  tipo_obra_id INTEGER NOT NULL REFERENCES tipos_obra(id) ON DELETE RESTRICT,
  andamento VARCHAR(50) NOT NULL DEFAULT 'EM ANDAMENTO',
  aditivo DECIMAL(15, 2) DEFAULT 0,
  data_inicio DATE,
  data_conclusao_prevista DATE,
  data_conclusao_real DATE,
  status VARCHAR(50) DEFAULT 'ATIVO',
  descricao TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Detalhes de Recursos por Obra
CREATE TABLE obra_recursos (
  id SERIAL PRIMARY KEY,
  obra_id INTEGER NOT NULL REFERENCES obras(id) ON DELETE CASCADE,
  recurso_id INTEGER NOT NULL REFERENCES recursos(id) ON DELETE RESTRICT,
  valor_recurso DECIMAL(15, 2) NOT NULL,
  valor_obra DECIMAL(15, 2) NOT NULL,
  valor_complementar DECIMAL(15, 2) DEFAULT 0,
  fonte_id INTEGER REFERENCES fontes(id) ON DELETE SET NULL,
  observacoes TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Itens/Despesas da Obra
CREATE TABLE obra_itens (
  id SERIAL PRIMARY KEY,
  obra_id INTEGER NOT NULL REFERENCES obras(id) ON DELETE CASCADE,
  descricao VARCHAR(255) NOT NULL,
  valor_previsto DECIMAL(15, 2) NOT NULL,
  valor_realizado DECIMAL(15, 2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'PENDENTE',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Histórico de Alterações
CREATE TABLE historico_obras (
  id SERIAL PRIMARY KEY,
  obra_id INTEGER NOT NULL REFERENCES obras(id) ON DELETE CASCADE,
  usuario VARCHAR(255),
  acao VARCHAR(100) NOT NULL,
  descricao_alteracao TEXT,
  dados_anteriores JSONB,
  dados_novos JSONB,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Usuários
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  tipo_usuario VARCHAR(50) NOT NULL DEFAULT 'VISUALIZADOR',
  ativo BOOLEAN DEFAULT true,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para Performance
CREATE INDEX idx_obras_vereador ON obras(vereador_id);
CREATE INDEX idx_obras_endereco ON obras(endereco_id);
CREATE INDEX idx_obras_tipo ON obras(tipo_obra_id);
CREATE INDEX idx_obras_status ON obras(status);
CREATE INDEX idx_obra_recursos_obra ON obra_recursos(obra_id);
CREATE INDEX idx_obra_recursos_recurso ON obra_recursos(recurso_id);
CREATE INDEX idx_obra_itens_obra ON obra_itens(obra_id);
CREATE INDEX idx_historico_obra ON historico_obras(obra_id);
CREATE INDEX idx_usuarios_email ON usuarios(email);

-- =====================================================
-- FIM DO SCHEMA
-- =====================================================
