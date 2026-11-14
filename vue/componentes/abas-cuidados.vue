<script>
export default {
  props: {
    abas: { type: Array, required: true },
  },
  emits: ['alterar'],
  data() {
    return { atual: 0 };
  },
  methods: {
    selecionar(indice) {
      this.atual = indice;
      this.$emit('alterar', indice);
    },
    usarTeclado(evento) {
      const ultimo = this.abas.length - 1;
      const destinos = {
        ArrowLeft: this.atual === 0 ? ultimo : this.atual - 1,
        ArrowRight: this.atual === ultimo ? 0 : this.atual + 1,
        Home: 0,
        End: ultimo,
      };

      if (!Object.hasOwn(destinos, evento.key)) return;
      evento.preventDefault();
      this.selecionar(destinos[evento.key]);
      this.$refs.lista.querySelectorAll('[role="tab"]')[this.atual].focus();
    },
  },
};
</script>

<template>
  <div class="abas">
    <div
      ref="lista"
      class="abas-lista"
      role="tablist"
      aria-label="Cuidados para sua visita"
      @keydown="usarTeclado"
    >
      <button
        v-for="({ titulo }, indice) in abas"
        :id="`cuidados-aba-${indice}`"
        :key="titulo"
        class="abas-botao"
        :class="{ ativo: atual === indice }"
        type="button"
        role="tab"
        :tabindex="atual === indice ? 0 : -1"
        :aria-selected="atual === indice"
        :aria-controls="`cuidados-painel-${indice}`"
        @click="selecionar(indice)"
      >
        {{ titulo }}
      </button>
    </div>
    <div
      v-for="({ titulo, conteudo }, indice) in abas"
      v-show="atual === indice"
      :id="`cuidados-painel-${indice}`"
      :key="titulo"
      class="abas-painel"
      role="tabpanel"
      tabindex="0"
      :aria-labelledby="`cuidados-aba-${indice}`"
    >
      <p>{{ conteudo }}</p>
    </div>
  </div>
</template>
