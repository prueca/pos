<template>
  <div class="order-item">
    <div class="col">
      <div class="name">
        {{ orderItem.product.name }}
      </div>
      <div class="price">
        P{{ Number(orderItem.price).toFixed(2) }}
      </div>
    </div>
    <div class="col">
      <div class="qty">
        x{{ orderItem.quantity }}
      </div>
    </div>
    <div class="col">
      <div class="item-total">
        P{{ Number(orderItem.itemTotal).toFixed(2) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderItem',
  props: ['orderItem']
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/orderItem'
</style>
