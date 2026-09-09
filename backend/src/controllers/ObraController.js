const db = require('../models');
const { Op } = require('sequelize');

class ObraController {
  // Listar todas as obras com filtros
  static async listar(req, res) {
    try {
      const { vereadorId, status, andamento, pagina = 1, limite = 10 } = req.query;
      const offset = (pagina - 1) * limite;

      const where = {};
      if (vereadorId) where.vereador_id = vereadorId;
      if (status) where.status = status;
      if (andamento) where.andamento = andamento;

      const { count, rows } = await db.Obra.findAndCountAll({
        where,
        include: [
          { model: db.Vereador },
          { model: db.Endereco },
          { model: db.TipoObra }
        ],
        offset,
        limit: parseInt(limite),
        order: [['id', 'DESC']]
      });

      res.status(200).json({
        total: count,
        pagina: parseInt(pagina),
        limite: parseInt(limite),
        dados: rows
      });
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  // Obter obra por ID
  static async obterPorId(req, res) {
    try {
      const { id } = req.params;
      const obra = await db.Obra.findByPk(id, {
        include: [
          { model: db.Vereador },
          { model: db.Endereco },
          { model: db.TipoObra },
          {
            model: db.ObraRecurso,
            include: [db.Recurso, db.Fonte]
          },
          { model: db.ObraItem }
        ]
      });

      if (!obra) {
        return res.status(404).json({ erro: 'Obra não encontrada' });
      }

      res.status(200).json(obra);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  // Criar nova obra
  static async criar(req, res) {
    try {
      const { vereadorId, enderecoId, tipoObraId, dataInicio, descricao } = req.body;

      if (!vereadorId || !enderecoId || !tipoObraId || !dataInicio) {
        return res.status(400).json({ erro: 'Dados obrigatórios faltando' });
      }

      const obra = await db.Obra.create({
        vereador_id: vereadorId,
        endereco_id: enderecoId,
        tipo_obra_id: tipoObraId,
        data_inicio: dataInicio,
        descricao
      });

      res.status(201).json(obra);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  // Atualizar obra
  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { andamento, aditivo, dataConclusaoReal, status } = req.body;

      const obra = await db.Obra.findByPk(id);
      if (!obra) {
        return res.status(404).json({ erro: 'Obra não encontrada' });
      }

      await obra.update({
        andamento,
        aditivo,
        data_conclusao_real: dataConclusaoReal,
        status
      });

      res.status(200).json(obra);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  // Deletar obra
  static async deletar(req, res) {
    try {
      const { id } = req.params;
      const obra = await db.Obra.findByPk(id);

      if (!obra) {
        return res.status(404).json({ erro: 'Obra não encontrada' });
      }

      await obra.destroy();
      res.status(204).send();
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  // Obter estatísticas das obras
  static async obterEstatisticas(req, res) {
    try {
      const totalObras = await db.Obra.count();
      const obrasEmAndamento = await db.Obra.count({
        where: { andamento: 'EM ANDAMENTO' }
      });
      const obrasParadas = await db.Obra.count({
        where: { andamento: 'PARADA' }
      });
      const obrasConcluidas = await db.Obra.count({
        where: { andamento: 'CONCLUÍDA' }
      });

      res.status(200).json({
        total: totalObras,
        emAndamento: obrasEmAndamento,
        paradas: obrasParadas,
        concluidas: obrasConcluidas
      });
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }
}

module.exports = ObraController;
