<template>
  <button
    class="btn"
    :form="form"
    :type="type || 'button'"
    @click="$emit('onclick', $event)">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'Btn',
  props: ['type', 'text', 'form']
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/fontawesome-free-5.13.0-web/css/all.min.css'
@import '~/assets/css/btn'
</style>
