<template>
  <div class="container">
    <div class="left-panel">
      <h3 class="panel-title">
        Cart Items
      </h3>
      <div class="cart-items">
        <CartItem />
        <CartItem />
        <CartItem />
      </div>
    </div>
    <div class="right-panel">
      <h3 class="panel-title">
        Order Summary
      </h3>
      <div class="order-summary">
        <div class="row clearfix">
          <div class="label float-left">
            Items in cart
          </div>
          <div class="value float-right">
            16
          </div>
        </div>
        <div class="row clearfix">
          <div class="label float-left">
            Subtotal
          </div>
          <div class="value float-right">
            P120.90
          </div>
        </div>
        <div class="row clearfix total-charge">
          <div class="label float-left">
            Total charge
          </div>
          <div class="value float-right">
            P120.90
          </div>
        </div>
        <div class="row">
          <Btn class="checkout-btn" text="Checkout" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from '~/components/CartItem';
import Btn from '~/components/Btn';
export default {
  components: { CartItem, Btn }
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/fontawesome-free-5.13.0-web/css/all.min.css'
@import '~/assets/css/cart'
</style>
