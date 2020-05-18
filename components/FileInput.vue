<template>
  <div class="file-input">
    <span class="icon" :class="icon" />
    <span class="file-name">
      No image selected
    </span>
    <span class="browse">
      Browse <input type="file">
    </span>
  </div>
</template>

<script>
export default {
  name: 'FileInput',
  props: ['icon']
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/fontawesome-free-5.13.0-web/css/all.min.css'
@import '~/assets/css/fileInput'
</style>
