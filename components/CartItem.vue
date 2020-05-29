<template>
  <div class="cart-item">
    <div class="col">
      <div class="name">
        Pandesal
      </div>
      <div class="price">
        P2.00
      </div>
    </div>
    <div class="col">
      <Btn type="button" text="-" />
      <TextInput value="1" text-align="center" />
      <Btn type="button" text="+" />
    </div>
    <div class="col">
      <div class="item-total-price">
        P2.00
      </div>
    </div>
    <div class="col">
      <Btn class="remove-btn" type="button" text="Remove" />
    </div>
  </div>
</template>

<script>
import TextInput from '~/components/TextInput';
import Btn from '~/components/Btn';
export default {
  name: 'CartItem',
  components: { Btn, TextInput }
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/cartItem'
</style>
