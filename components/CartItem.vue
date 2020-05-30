<template>
  <div class="cart-item">
    <div class="col">
      <div class="name">
        {{ cartItem.product.name }}
      </div>
      <div class="price">
        P{{ Number(cartItem.product.price).toFixed(2) }}
      </div>
    </div>
    <div class="col">
      <Btn type="button" text="-" />
      <TextInput :value="cartItem.quantity" text-align="center" />
      <Btn type="button" text="+" />
    </div>
    <div class="col">
      <div class="item-total">
        P{{ Number(cartItem.itemTotal).toFixed(2) }}
      </div>
    </div>
    <div class="col">
      <Btn class="remove-btn" type="button" text="Remove" />
      <Btn class="update-btn" type="button" text="Update" />
    </div>
  </div>
</template>

<script>
import TextInput from '~/components/TextInput';
import Btn from '~/components/Btn';
export default {
  name: 'CartItem',
  components: { Btn, TextInput },
  props: ['cartItem']
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/cartItem'
</style>
