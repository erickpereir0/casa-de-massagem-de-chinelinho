<script>
export default {
  props: {
    pagina: { type: Number, required: true },
    totalPaginas: { type: Number, required: true },
  },
  emits: ['navegar'],
  methods: {
    navegar(destino) {
      if (destino >= 1 && destino <= this.totalPaginas && destino !== this.pagina) {
        this.$emit('navegar', destino);
      }
    },
  },
};
</script>

<template>
  <nav class="paginacao" aria-label="Paginação">
    <button
      type="button"
      :disabled="pagina === 1"
      @click="navegar(pagina - 1)"
    >
      Anterior
    </button>
    <button
      v-for="numero in totalPaginas"
      :key="numero"
      type="button"
      :class="{ ativo: numero === pagina }"
      :aria-current="numero === pagina ? 'page' : undefined"
      :aria-label="`Página ${numero}`"
      @click="navegar(numero)"
    >
      {{ numero }}
    </button>
    <button
      type="button"
      :disabled="pagina === totalPaginas"
      @click="navegar(pagina + 1)"
    >
      Próxima
    </button>
  </nav>
</template>
