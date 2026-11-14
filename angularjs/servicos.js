import { categorias, formularioInicial, itensPorPagina, massagens, progressoReserva } from '../compartilhado/dados.js'

export function registrarServicos(app) {
  app.service('catalogoMassagens', function () {
    this.listar = (categoria, pagina) => {
      const selecionadas = categoria === categorias[0]
        ? massagens
        : massagens.filter((massagem) => massagem.categoria === categoria)
      const inicio = (pagina - 1) * itensPorPagina

      return {
        itens: selecionadas.slice(inicio, inicio + itensPorPagina),
        totalPaginas: Math.max(1, Math.ceil(selecionadas.length / itensPorPagina)),
      }
    }
  })

  app.factory('reservaLocal', function () {
    const reserva = { formulario: formularioInicial(), progresso: 0 }

    reserva.atualizarProgresso = () => {
      reserva.progresso = progressoReserva(reserva.formulario)
    }

    reserva.selecionarMassagem = (id) => {
      reserva.formulario.massagem = id
      reserva.atualizarProgresso()
    }

    reserva.limpar = () => {
      reserva.formulario = formularioInicial()
      reserva.atualizarProgresso()
    }

    return reserva
  })
}
