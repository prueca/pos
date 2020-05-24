<template>
  <button
    class="btn"
    :form="form"
    :type="type || 'button'"
    @click="$emit('onclick', $event)">
    <span v-if="loading">
      <i class="fas fa-fw fa-spin fa-spinner" />
    </span>
    <span v-else>
      {{ text }}
    </span>
  </button>
</template>

<script>
export default {
  name: 'Btn',
  props: ['type', 'text', 'form', 'loading']
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/fontawesome-free-5.13.0-web/css/all.min.css'
@import '~/assets/css/btn'
</style>
