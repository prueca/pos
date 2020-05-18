<template>
  <a href="#" class="btn-link" @click.prevent="$emit('onClick')">
    {{ text }}
  </a>
</template>

<script>
export default {
  name: 'BtnLink',
  props: ['text']
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/fontawesome-free-5.13.0-web/css/all.min.css'
@import '~/assets/css/btnLink'
</style>
