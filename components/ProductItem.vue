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
        P{{ Number(price).toFixed(2) }}
      </div>
    </div>
    <div class="row btn-grp">
      <Btn text="Edit" />
      <Btn text="Delete" />
    </div>
  </div>
</template>

<script>
import Btn from '~/components/Btn';
export default {
  name: 'ProductItem',
  components: { Btn },
  props: ['image', 'name', 'price', 'stock']
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/productItem'
</style>
