<template>
  <div class="dropdown">
    <span class="icon" :class="icon" />
    <select>
      <option selected disabled>
        {{ defaultOpt }}
      </option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: ['defaultOpt', 'options', 'icon']
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/fontawesome-free-5.13.0-web/css/all.min.css'
@import '~/assets/css/dropdown'
</style>
