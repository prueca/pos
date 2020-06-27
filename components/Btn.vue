<template>
  <button
    class="btn"
    :form="form"
    :type="type || 'button'"
    :disabled="disabled"
    @click="$emit('onclick', $event)">
    <span v-if="loading">
      <i class="fas fa-fw fa-spin fa-spinner" />
    </span>
    <div v-else>
      <span v-if="icon" :class="icon" />
      <span v-if="text">{{ text }}</span>
    </div>
  </button>
</template>

<script>
export default {
  name: 'Btn',
  props: ['type', 'text', 'form', 'loading', 'disabled', 'icon']
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/fontawesome-free-5.13.0-web/css/all.min.css'
@import '~/assets/css/btn'
</style>
