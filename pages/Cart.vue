<template>
  <div class="container">
    <div class="left-panel">
      <h3 class="panel-title">
        Cart Items
      </h3>
      <p v-if="!orderItems && message" class="message">
        <span v-if="loadingItems" class="fas fa-fw fa-spin fa-spinner" />
        {{ message }}
      </p>
      <CartItem />
      <div v-if="orderItems" class="cart-items">
        <CartItem
          v-for="item in orderIems"
          :key="item.id"
          :item="item" />
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
            {{ inCart }}
          </div>
        </div>
        <div class="row clearfix">
          <div class="label float-left">
            Order ID
          </div>
          <div class="value float-right">
            {{ orderId }}
          </div>
        </div>
        <div class="row clearfix total-charge">
          <div class="label float-left">
            Total charge
          </div>
          <div class="value float-right">
            {{ totalCharge }}
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
import urls from '~/configs/urls';

export default {
  components: { CartItem, Btn },
  data: () => ({
    message: 'Empty cart',
    loadingItems: false,
    orderItems: null,
    inCart: '---',
    orderId: '---',
    totalCharge: '---'
  }),
  created() {
    const oid = this.$cookies.get('oid');

    if (!oid) {
      return false;
    }

    this.loadingItems = true;
    this.message = 'Loading order items...';
    this.$axios.get(`${urls.GET_ORDER}/${oid}`);
  }
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/fontawesome-free-5.13.0-web/css/all.min.css'
@import '~/assets/css/cart'
</style>
