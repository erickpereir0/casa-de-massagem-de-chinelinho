<script>
export default {
  props: {
    opcoes: { type: Array, required: true },
    selecionada: { type: String, required: true },
  },
  emits: ['selecionar'],
  data() {
    return { aberto: false };
  },
  mounted() {
    document.addEventListener('click', this.fecharAoClicarFora);
    document.addEventListener('keydown', this.fecharComEscape);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.fecharAoClicarFora);
    document.removeEventListener('keydown', this.fecharComEscape);
  },
  methods: {
    escolher(opcao) {
      this.$emit('selecionar', opcao);
      this.aberto = false;
      this.$refs.botao.focus();
    },
    fecharAoClicarFora(evento) {
      if (!this.$el.contains(evento.target)) this.aberto = false;
    },
    fecharComEscape(evento) {
      if (this.aberto && evento.key === 'Escape') {
        this.aberto = false;
        this.$refs.botao.focus();
      }
    },
  },
};
</script>

<template>
  <div class="dropdown">
    <button
      ref="botao"
      type="button"
      class="dropdown-botao"
      :aria-expanded="aberto"
      aria-controls="categorias-menu"
      @click="aberto = !aberto"
    >
      {{ selecionada }}
      <span aria-hidden="true">⌄</span>
    </button>
    <ul v-show="aberto" id="categorias-menu" class="dropdown-menu" aria-label="Categorias">
      <li v-for="opcao in opcoes" :key="opcao">
        <button
          type="button"
          class="dropdown-opcao"
          :class="{ ativo: selecionada === opcao }"
          :aria-pressed="selecionada === opcao"
          @click="escolher(opcao)"
        >
          {{ opcao }}
        </button>
      </li>
    </ul>
  </div>
</template>
