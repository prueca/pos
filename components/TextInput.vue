<template>
  <div class="text-input">
    <span v-if="icon" class="icon" :class="icon" />
    <input
      v-model="val"
      :type="type || 'text'"
      :placeholder="placeholder"
      :style="{ 'text-align': textAlign || 'left' }"
      @blur="$emit('onblur', $event)"
      @change="$emit('onchange', $event)">
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: ['value', 'type', 'icon', 'placeholder', 'textAlign'],
  computed: {
    val: {
      get() { return this.value; },
      set(v) { this.$emit('input', v); }
    }
  }
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/fontawesome-free-5.13.0-web/css/all.min.css'
@import '~/assets/css/textInput'
</style>
