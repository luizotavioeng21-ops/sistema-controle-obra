# Sistema de Controle de Obra 🏗️

Sistema completo para gestão e controle de obras públicas, rastreamento de recursos financeiros, vereadores responsáveis e andamento de projetos.

## 📋 Características

- ✅ Gestão de vereadores e suas obras
- ✅ Controle de endereços e localização de obras
- ✅ Rastreamento de tipos de obras (Pavimentação, Reforma de Ponte, Muro Gabião, etc)
- ✅ Gestão de recursos financeiros (Estadual, Federal)
- ✅ Cálculo automático de valores (Obra, Complementar, Recurso)
- ✅ Rastreamento de fontes de financiamento
- ✅ Dashboard com relatórios e análises
- ✅ Sistema de aditivios para obras
- ✅ Histórico e auditoria de alterações

## 🏗️ Arquitetura

```
sistema-controle-obra/
├── backend/           # API Node.js/Express
├── frontend/          # React Dashboard
├── database/          # Scripts SQL
├── docs/              # Documentação
└── README.md          # Este arquivo
```

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **PostgreSQL** - Banco de dados
- **Sequelize** - ORM
- **JWT** - Autenticação
- **Joi** - Validação

### Frontend
- **React 18** - Interface
- **TypeScript** - Type safety
- **Material-UI** - Componentes UI
- **Chart.js** - Gráficos e relatórios
- **Axios** - HTTP client
- **React Router** - Roteamento

## 📊 Banco de Dados

### Entidades Principais

1. **Vereadores** - Responsáveis pelas obras
2. **Obras** - Projetos em andamento
3. **Endereços** - Localização das obras
4. **Recursos** - Financiamento (Estadual/Federal)
5. **Aditivios** - Alterações e adições nas obras
6. **Fontes** - Fontes de financiamento
7. **Detalhes de Recursos** - Breakdown dos custos

## 🚀 Quick Start

### Pré-requisitos
- Node.js v16+
- PostgreSQL 12+
- npm ou yarn

### Instalação Backend

```bash
cd backend
npm install
npm run migrate
npm run seed
npm run dev
```

### Instalação Frontend

```bash
cd frontend
npm install
npm start
```

## 📖 Documentação

- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [User Guide](./docs/USER_GUIDE.md)
- [Development Guide](./docs/DEVELOPMENT.md)

## 👥 Equipe

Desenvolvido para gestão municipal de obras públicas.

## 📝 Licença

MIT License - veja LICENSE para detalhes

---

**Status**: Em desenvolvimento 🔨
