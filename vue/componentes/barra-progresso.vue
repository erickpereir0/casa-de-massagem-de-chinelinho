<script>
export default {
  props: {
    valor: { type: Number, required: true },
  },
  computed: {
    percentual() {
      return Math.max(0, Math.min(100, this.valor));
    },
  },
};
</script>

<template>
  <div class="progresso">
    <p class="progresso-legenda">
      <span>Preenchimento do formulário</span>
      <strong>{{ percentual }}%</strong>
    </p>
    <div
      class="progresso-trilho"
      role="progressbar"
      aria-label="Preenchimento do formulário"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="percentual"
    >
      <div class="progresso-barra" :style="{ width: `${percentual}%` }"></div>
    </div>
  </div>
</template>
