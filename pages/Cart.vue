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
import { errHandler, getProp } from '~/helper';

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
    this.$axios.get(`${urls.GET_CART_ITEMS}/${oid}`)
      .then((res) => {
        this.loadingItems = false;
        this.message = null;

        if (res.data.error) {
          this.message = res.data.error.message;
          return;
        }

        this.setOrderData(res.data.order);
      })
      .catch(errHandler);
  },
  methods: {
    setOrderData(params) {
      if (params) {
        this.orderId = params.orderId;
        this.orderItems = params.orderItems;
        this.inCart = params.itemCount;
        this.totalCharge = `₱${Number(params.totalCharge).toFixed(2)}`;
      }
    },
    placeOrder() {
      const oid = this.$cookies.get('oid');

      if (!oid) {
        return;
      }

      const items = this.orderItems.map((item) => {
        return {
          pid: item.product.productId,
          qty: Number(item.quantity)
        };
      });

      this.placingOrder = true;
      this.$axios.$post(urls.PLACE_ORDER, { oid, items })
        .then((res) => {
          const error = getProp(res, 'error.message');

          if (error) {
            this.placingOrder = false;
            alert(error);
            return;
          }

          this.$router.push('/');
        })
        .catch(errHandler);
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
