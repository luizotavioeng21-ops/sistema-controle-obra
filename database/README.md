# 📊 Documentação do Banco de Dados

## Schema Overview

O banco de dados foi projetado para gerenciar completamente o ciclo de vida das obras públicas, desde seu planejamento até a conclusão.

## 📋 Tabelas Principais

### 1. **vereadores**
Armazena informações dos vereadores responsáveis pelas obras.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | SERIAL | ID único |
| nome | VARCHAR(255) | Nome do vereador (único) |
| ativo | BOOLEAN | Status ativo/inativo |
| criado_em | TIMESTAMP | Data de criação |
| atualizado_em | TIMESTAMP | Data de última atualização |

### 2. **enderecos**
Localização geográfica das obras.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | SERIAL | ID único |
| rua | VARCHAR(255) | Nome da rua |
| numero | VARCHAR(10) | Número do endereço |
| complemento | VARCHAR(255) | Complemento (Apto, Loja, etc) |
| bairro | VARCHAR(100) | Bairro |
| cidade | VARCHAR(100) | Cidade |
| estado | VARCHAR(2) | Estado (MG, SP, etc) |
| cep | VARCHAR(9) | CEP |
| criado_em | TIMESTAMP | Data de criação |
| atualizado_em | TIMESTAMP | Data de última atualização |

### 3. **tipos_obra**
Classificação dos tipos de trabalho realizados.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | SERIAL | ID único |
| nome | VARCHAR(255) | Nome do tipo (único) |
| descricao | TEXT | Descrição detalhada |
| criado_em | TIMESTAMP | Data de criação |
| atualizado_em | TIMESTAMP | Data de última atualização |

**Exemplos:**
- Pavimentação
- Reforma de Ponte
- Muro Gabião

### 4. **recursos**
Tipos de financiamento disponíveis.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | SERIAL | ID único |
| nome | VARCHAR(100) | Nome do recurso (único) |
| descricao | TEXT | Descrição |
| ativo | BOOLEAN | Status ativo/inativo |
| criado_em | TIMESTAMP | Data de criação |
| atualizado_em | TIMESTAMP | Data de última atualização |

**Exemplos:**
- Estadual
- Federal

### 5. **fontes**
Valores totais de financiamento disponíveis.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | SERIAL | ID único |
| valor | DECIMAL(15,2) | Valor em R$ |
| descricao | TEXT | Descrição da fonte |
| criado_em | TIMESTAMP | Data de criação |
| atualizado_em | TIMESTAMP | Data de última atualização |

### 6. **obras** (Principal)
Tabela central com todos os detalhes das obras.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | SERIAL | ID único |
| vereador_id | INTEGER FK | Referência ao vereador responsável |
| endereco_id | INTEGER FK | Localização da obra |
| tipo_obra_id | INTEGER FK | Tipo de trabalho |
| andamento | VARCHAR(50) | Status (EM ANDAMENTO, PARADA, CONCLUÍDA) |
| aditivo | DECIMAL(15,2) | Valor adicional |
| data_inicio | DATE | Data de início |
| data_conclusao_prevista | DATE | Previsão de conclusão |
| data_conclusao_real | DATE | Data real de conclusão |
| status | VARCHAR(50) | ATIVO/INATIVO |
| descricao | TEXT | Detalhes adicionais |
| criado_em | TIMESTAMP | Data de criação |
| atualizado_em | TIMESTAMP | Data de última atualização |

### 7. **obra_recursos**
Relacionamento entre obras e recursos com valores específicos.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | SERIAL | ID único |
| obra_id | INTEGER FK | Referência à obra |
| recurso_id | INTEGER FK | Tipo de recurso (Estadual/Federal) |
| valor_recurso | DECIMAL(15,2) | Valor do recurso em R$ |
| valor_obra | DECIMAL(15,2) | Valor utilizado na obra |
| valor_complementar | DECIMAL(15,2) | Valor complementar necessário |
| fonte_id | INTEGER FK | Fonte de financiamento |
| observacoes | TEXT | Notas sobre o recurso |
| criado_em | TIMESTAMP | Data de criação |
| atualizado_em | TIMESTAMP | Data de última atualização |

### 8. **obra_itens**
Detalhamento de despesas/itens dentro de cada obra.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | SERIAL | ID único |
| obra_id | INTEGER FK | Referência à obra |
| descricao | VARCHAR(255) | Descrição do item |
| valor_previsto | DECIMAL(15,2) | Valor orçado |
| valor_realizado | DECIMAL(15,2) | Valor gasto até agora |
| status | VARCHAR(50) | PENDENTE/EM PROGRESSO/CONCLUÍDO |
| criado_em | TIMESTAMP | Data de criação |
| atualizado_em | TIMESTAMP | Data de última atualização |

### 9. **historico_obras**
Auditoria de todas as alterações nas obras.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | SERIAL | ID único |
| obra_id | INTEGER FK | Referência à obra |
| usuario | VARCHAR(255) | Usuário que fez a alteração |
| acao | VARCHAR(100) | Tipo de ação (INSERT/UPDATE/DELETE) |
| descricao_alteracao | TEXT | Descrição da mudança |
| dados_anteriores | JSONB | Estado anterior em JSON |
| dados_novos | JSONB | Novo estado em JSON |
| criado_em | TIMESTAMP | Data da alteração |

### 10. **usuarios**
Usuários do sistema.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | SERIAL | ID único |
| nome | VARCHAR(255) | Nome completo |
| email | VARCHAR(255) | Email (único) |
| senha_hash | VARCHAR(255) | Hash da senha |
| tipo_usuario | VARCHAR(50) | ADMINISTRADOR/GESTOR/VISUALIZADOR |
| ativo | BOOLEAN | Status ativo/inativo |
| criado_em | TIMESTAMP | Data de criação |
| atualizado_em | TIMESTAMP | Data de última atualização |

## 🔗 Relacionamentos

```
vereadores (1) ──────────── (N) obras
enderecos (1) ──────────── (N) obras
tipos_obra (1) ──────────── (N) obras
obras (1) ──────────── (N) obra_recursos
recursos (1) ──────────── (N) obra_recursos
fontes (1) ──────────── (N) obra_recursos
obras (1) ──────────---- (N) obra_itens
obras (1) ──────────---- (N) historico_obras
```

## 📈 Índices para Performance

Todos os relacionamentos têm índices criados:
- `idx_obras_vereador` - Buscar obras por vereador
- `idx_obras_endereco` - Buscar obras por endereço
- `idx_obras_tipo` - Buscar obras por tipo
- `idx_obras_status` - Buscar obras por status
- `idx_obra_recursos_obra` - Buscar recursos de uma obra
- `idx_historico_obra` - Buscar histórico de uma obra
- `idx_usuarios_email` - Buscar usuário por email

## 💾 Scripts de Instalação

### Criar o Schema
```bash
psql -U postgres -d seu_banco < database/schema.sql
```

### Inserir Dados de Exemplo
```bash
psql -U postgres -d seu_banco < database/seed.sql
```

### Ou em uma única operação
```bash
psql -U postgres -d seu_banco < database/schema.sql < database/seed.sql
```

## 📊 Consultas Úteis

### Total de obras por vereador
```sql
SELECT v.nome, COUNT(o.id) as total_obras
FROM vereadores v
LEFT JOIN obras o ON v.id = o.vereador_id
GROUP BY v.id, v.nome;
```

### Valor total de recursos por tipo
```sql
SELECT r.nome, SUM(op.valor_recurso) as total
FROM obra_recursos op
JOIN recursos r ON op.recurso_id = r.id
GROUP BY r.id, r.nome;
```

### Obras com valores complementares pendentes
```sql
SELECT o.id, v.nome, SUM(op.valor_complementar) as valor_complementar
FROM obras o
JOIN vereadores v ON o.vereador_id = v.id
JOIN obra_recursos op ON o.id = op.obra_id
WHERE op.valor_complementar > 0
GROUP BY o.id, v.nome;
```

### Resumo financeiro por vereador
```sql
SELECT 
  v.nome,
  COUNT(DISTINCT o.id) as total_obras,
  SUM(op.valor_recurso) as total_recursos,
  SUM(op.valor_obra) as total_utilizado,
  SUM(op.valor_complementar) as total_complementar
FROM vereadores v
LEFT JOIN obras o ON v.id = o.vereador_id
LEFT JOIN obra_recursos op ON o.id = op.obra_id
GROUP BY v.id, v.nome;
```

## ⚙️ Manutenção

### Backup
```bash
pg_dump -U postgres seu_banco > backup_$(date +%Y%m%d).sql
```

### Restauração
```bash
psql -U postgres seu_banco < backup_20260909.sql
```

---

**Última Atualização**: 2026-09-09
