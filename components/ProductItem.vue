<template>
  <div class="item">
    <div class="row">
      <div class="name">
        {{ name }}
      </div>
    </div>
    <div class="row clearfix">
      <div class="stock">
        In stock: {{ stock }}
      </div>
      <div class="price">
        P{{ price.toFixed(2) }}
      </div>
    </div>
    <div class="row btn-grp">
      <BtnLink text="Edit" class="btn" />
      <BtnLink text="Delete" class="btn" />
    </div>
  </div>
</template>

<script>
import BtnLink from '~/components/BtnLink';
export default {
  name: 'ProductItem',
  components: { BtnLink },
  props: ['image', 'name', 'price', 'stock']
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/productItem'
</style>
