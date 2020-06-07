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
      <div v-if="orderItems" class="cart-items">
        <CartItem
          v-for="item in orderItems"
          :key="item.itemId"
          :oid="oid"
          :cart-item="item"
          :placing-order="placingOrder"
          @emptyCart="emptyCart"
          @setOrderData="setOrderData" />
      </div>
    </div>
    <div class="right-panel">
      <h3 class="panel-title">
        Order Summary
      </h3>
      <div class="order-summary">
        <div class="row clearfix">
          <div class="label float-left">
            Items in Cart
          </div>
          <div class="value float-right">
            {{ inCart }}
          </div>
        </div>
        <div class="row clearfix">
          <div class="label float-left">
            Order Number
          </div>
          <div class="value float-right">
            {{ orderId }}
          </div>
        </div>
        <div class="row clearfix total-charge">
          <div class="label float-left">
            Total Charge
          </div>
          <div class="value float-right">
            {{ totalCharge }}
          </div>
        </div>
        <div class="row">
          <Btn
            class="place-order-btn"
            text="Place Order"
            :loading="placingOrder"
            @onclick="placeOrder" />
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
    placingOrder: false,
    orderItems: null,
    oid: null,
    inCart: '---',
    orderId: '---',
    totalCharge: '---'
  }),
  created() {
    const oid = this.$cookies.get('oid');
    this.oid = oid;

    if (!oid) {
      return false;
    }

    this.loadingItems = true;
    this.message = 'Loading order items...';
    this.$axios.get(`${urls.GET_ORDER}/${oid}`)
      .then((res) => {
        this.loadingItems = false;
        this.message = null;

        if (res.data.error) {
          this.message = res.data.error.message;
          return;
        }

        this.setOrderData(res.data.order);
      })
      .catch(err => alert(err.message));
  },
  methods: {
    setOrderData(params) {
      this.orderId = params.orderId;
      this.orderItems = params.orderItems;
      this.inCart = params.itemCount;
      this.totalCharge = `P${Number(params.totalCharge).toFixed(2)}`;
    },
    placeOrder() {
      const oid = this.$cookies.get('oid');

      if (!oid) {
        return;
      }

      const items = this.orderItems.map((item) => {
        return {
          name: item.product.name,
          pid: item.product.productId,
          qty: item.quantity
        };
      });

      this.placingOrder = true;
      this.$axios.$post(urls.PLACE_ORDER, { oid, items })
        .then((res) => {
          if (res.message) {
            this.placingOrder = false;
            alert(res.message);
            return;
          }

          this.$router.push('/');
        })
        .catch(err => alert(err.message));
    },
    emptyCart() {
      this.oid = null;
      this.orderItems = null;
      this.message = 'Empty cart';
      this.inCart = '---';
      this.orderId = '---';
      this.totalCharge = '---';
    }
  }
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/fontawesome-free-5.13.0-web/css/all.min.css'
@import '~/assets/css/cart'
</style>