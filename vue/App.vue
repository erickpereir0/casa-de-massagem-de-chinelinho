<script>
import {
  massagens,
  categorias,
  perguntas,
  abas,
  horarios,
  formatarPreco,
  itensPorPagina,
  formularioInicial,
  progressoReserva,
  dataMinima,
  imagemEspaco,
} from '../compartilhado/dados.js';
import AcordeaoPerguntas from './componentes/acordeao-perguntas.vue';
import PaginacaoCatalogo from './componentes/paginacao-catalogo.vue';
import BarraProgresso from './componentes/barra-progresso.vue';
import AbasCuidados from './componentes/abas-cuidados.vue';
import DropdownCategorias from './componentes/dropdown-categorias.vue';
import ToastAviso from './componentes/toast-aviso.vue';

export default {
  components: {
    AcordeaoPerguntas,
    PaginacaoCatalogo,
    BarraProgresso,
    AbasCuidados,
    DropdownCategorias,
    ToastAviso,
  },
  data() {
    return {
      massagens,
      categorias,
      perguntas,
      abas,
      horarios,
      imagemEspaco,
      categoria: categorias[0],
      pagina: 1,
      formulario: formularioInicial(),
      hoje: dataMinima(),
      aviso: null,
    };
  },
  computed: {
    massagensFiltradas() {
      return this.categoria === this.categorias[0]
        ? this.massagens
        : this.massagens.filter((massagem) => massagem.categoria === this.categoria);
    },
    totalPaginas() {
      return Math.max(1, Math.ceil(this.massagensFiltradas.length / itensPorPagina));
    },
    massagensVisiveis() {
      const inicio = (this.pagina - 1) * itensPorPagina;
      return this.massagensFiltradas.slice(inicio, inicio + itensPorPagina);
    },
    progresso() {
      return progressoReserva(this.formulario);
    },
  },
  mounted() {
    window.addEventListener('focus', this.atualizarDataMinima);
  },
  beforeUnmount() {
    window.removeEventListener('focus', this.atualizarDataMinima);
  },
  methods: {
    formatarPreco,
    atualizarDataMinima() {
      this.hoje = dataMinima();
    },
    filtrar(categoria) {
      this.categoria = categoria;
      this.pagina = 1;
    },
    selecionarMassagem(id) {
      this.formulario.massagem = id;
      this.aviso = {
        tipo: 'info',
        mensagem: 'Massagem selecionada. Complete os dados da reserva.',
      };
    },
    simularReserva() {
      const { nome, massagem, data, horario } = this.formulario;
      this.atualizarDataMinima();
      if (
        nome.trim().length < 2 ||
        !this.massagens.some(({ id }) => id === massagem) ||
        data < this.hoje ||
        !this.horarios.includes(horario)
      ) {
        this.aviso = {
          tipo: 'erro',
          mensagem: 'Revise o nome, a massagem, a data e o horário da reserva.',
        };
        return;
      }

      this.aviso = { tipo: 'sucesso', mensagem: 'Reserva simulada com sucesso!' };
      this.formulario = formularioInicial();
    },
  },
};
</script>

<template>
  <header id="inicio" class="cabecalho">
    <div class="limite cabecalho-interno">
      <a class="marca" href="#inicio">De Chinelinho</a>
      <nav class="navegacao" aria-label="Navegação principal">
        <a href="#massagens">Massagens</a>
        <a href="#espaco">O espaço</a>
        <a href="#duvidas">Dúvidas</a>
      </nav>
      <a class="botao botao-compacto" href="#reserva">Reservar</a>
    </div>
  </header>

  <main>
    <section class="hero" aria-labelledby="titulo-principal">
      <div class="limite hero-interno">
        <h1 id="titulo-principal">Casa de Massagem De Chinelinho</h1>
        <p>Conheça nossas massagens e encontre um momento para relaxar.</p>
        <a class="botao" href="#massagens">Ver massagens</a>
      </div>
    </section>

    <section id="massagens" class="secao limite" aria-labelledby="titulo-massagens">
      <div class="cabeca-secao">
        <div>
          <h2 id="titulo-massagens">Nossas massagens</h2>
          <p>Escolha o cuidado que combina com o seu momento.</p>
        </div>
        <DropdownCategorias :opcoes="categorias" :selecionada="categoria" @selecionar="filtrar" />
      </div>

      <div class="catalogo">
        <article v-for="massagem in massagensVisiveis" :key="massagem.id" class="cartao">
          <img class="cartao-imagem" :src="massagem.imagem" :alt="massagem.nome" loading="lazy">
          <div class="cartao-corpo">
            <div class="cartao-meta">
              <span>{{ massagem.categoria }}</span>
              <span>{{ massagem.duracao }} min</span>
            </div>
            <h3>{{ massagem.nome }}</h3>
            <p>{{ massagem.descricao }}</p>
            <div class="cartao-rodape">
              <strong>{{ formatarPreco(massagem.preco) }}</strong>
              <a class="cartao-acao" href="#reserva" @click="selecionarMassagem(massagem.id)">Selecionar</a>
            </div>
          </div>
        </article>
      </div>
      <PaginacaoCatalogo :pagina="pagina" :total-paginas="totalPaginas" @navegar="pagina = $event" />
    </section>

    <section id="espaco" class="secao secao-espaco" aria-labelledby="titulo-espaco">
      <div class="limite espaco-grade">
        <img class="espaco-imagem" :src="imagemEspaco" alt="Banco de madeira e plantas na recepção da casa" loading="lazy">
        <div>
          <h2 id="titulo-espaco">Um espaço para desacelerar</h2>
          <p>Luz suave, tecidos naturais e tempo para respirar. Conheça a casa antes de chegar.</p>
          <AbasCuidados :abas="abas" />
        </div>
      </div>
    </section>

    <section id="reserva" class="secao limite" aria-labelledby="titulo-reserva">
      <div class="reserva-grade">
        <div>
          <h2 id="titulo-reserva">Reserve um tempo para você</h2>
          <p>Experimente o formulário e veja como seria marcar sua sessão.</p>
          <BarraProgresso :valor="progresso" />
        </div>

        <form class="formulario" @submit.prevent="simularReserva">
          <div class="formulario-campos">
            <label>
              Nome
              <input v-model="formulario.nome" name="nome" type="text" autocomplete="name" minlength="2" required>
            </label>
            <label>
              <span id="rotulo-massagem">Massagem</span>
              <select v-model="formulario.massagem" name="massagem" aria-labelledby="rotulo-massagem" required>
                <option value="" disabled>Escolha uma massagem</option>
                <option v-for="massagem in massagens" :key="massagem.id" :value="massagem.id">
                  {{ massagem.nome }}
                </option>
              </select>
            </label>
            <label>
              Data
              <input v-model="formulario.data" name="data" type="date" :min="hoje" required>
            </label>
            <label>
              <span id="rotulo-horario">Horário</span>
              <select v-model="formulario.horario" name="horario" aria-labelledby="rotulo-horario" required>
                <option value="" disabled>Escolha um horário</option>
                <option v-for="horario in horarios" :key="horario" :value="horario">{{ horario }}</option>
              </select>
            </label>
          </div>
          <button type="submit" class="botao">Simular reserva</button>
        </form>
      </div>
    </section>

    <section id="duvidas" class="secao secao-duvidas" aria-labelledby="titulo-duvidas">
      <div class="limite duvidas-grade">
        <div>
          <h2 id="titulo-duvidas">Antes de chegar</h2>
        </div>
        <AcordeaoPerguntas :perguntas="perguntas" />
      </div>
    </section>
  </main>

  <footer class="rodape">
    <div class="limite rodape-interno">
      <p>Projeto acadêmico de desenvolvimento web.</p>
      <a href="../">Versão AngularJS</a>
    </div>
  </footer>

  <ToastAviso :aviso="aviso" @fechar="aviso = null" />
</template>
