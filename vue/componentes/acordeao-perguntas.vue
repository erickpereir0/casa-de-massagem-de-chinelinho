<script>
export default {
  props: {
    perguntas: { type: Array, required: true },
  },
  emits: ['alterar'],
  data() {
    return { aberta: null };
  },
  methods: {
    alternar(indice) {
      this.aberta = this.aberta === indice ? null : indice;
      this.$emit('alterar', this.aberta);
    },
  },
};
</script>

<template>
  <div class="acordeao">
    <article
      v-for="({ titulo, conteudo }, indice) in perguntas"
      :key="titulo"
      class="acordeao-item"
      :class="{ aberto: aberta === indice }"
    >
      <h3>
        <button
          :id="`faq-botao-${indice}`"
          type="button"
          class="acordeao-botao"
          :aria-controls="`faq-painel-${indice}`"
          :aria-expanded="aberta === indice"
          @click="alternar(indice)"
        >
          {{ titulo }}
          <span aria-hidden="true">{{ aberta === indice ? '−' : '+' }}</span>
        </button>
      </h3>
      <div
        :id="`faq-painel-${indice}`"
        class="acordeao-painel"
        role="region"
        :aria-labelledby="`faq-botao-${indice}`"
        :aria-hidden="aberta !== indice"
      >
        <div><p>{{ conteudo }}</p></div>
      </div>
    </article>
  </div>
</template>
