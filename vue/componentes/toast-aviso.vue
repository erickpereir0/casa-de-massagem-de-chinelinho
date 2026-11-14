<script>
export default {
  props: {
    aviso: { type: Object, default: null },
    duracao: { type: Number, default: 4200 },
  },
  emits: ['fechar'],
  data() {
    return { temporizador: null };
  },
  watch: {
    aviso: {
      immediate: true,
      handler(aviso) {
        window.clearTimeout(this.temporizador);
        if (aviso) this.temporizador = window.setTimeout(this.fechar, this.duracao);
      },
    },
  },
  beforeUnmount() {
    window.clearTimeout(this.temporizador);
  },
  methods: {
    fechar() {
      this.$emit('fechar');
    },
  },
};
</script>

<template>
  <div class="toast-regiao" role="status" aria-live="polite" aria-atomic="true">
    <div v-if="aviso" class="toast" :class="`toast-${aviso.tipo}`">
      <p>{{ aviso.mensagem }}</p>
      <button type="button" aria-label="Fechar notificação" @click="fechar">
        <span aria-hidden="true">×</span>
      </button>
    </div>
  </div>
</template>
