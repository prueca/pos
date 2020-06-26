<template>
  <div class="container">
    <div class="left-panel">
      <h3 class="panel-title">
        Order Items
      </h3>
      <p v-if="!orderItems && message" class="message">
        <span v-if="loadingItems" class="fas fa-fw fa-spin fa-spinner" />
        {{ message }}
      </p>
      <div v-if="orderItems">
        <OrderItem
          v-for="item in orderItems"
          :key="item.itemId"
          :order-item="item" />
      </div>
    </div>
    <div class="right-panel">
      <h3 class="panel-title">
        Order Summary
      </h3>
      <div class="order-summary">
        <div class="row clearfix">
          <div class="label float-left">
            Item Count
          </div>
          <div class="value float-right">
            {{ itemCount }}
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
      </div>
    </div>
  </div>
</template>

<script>
import OrderItem from '~/components/OrderItem';
import urls from '~/configs/urls';
import { errHandler } from '~/helper';

export default {
  validate({ params }) {
    return /^\d+$/.test(params.oid);
  },
  components: { OrderItem },
  data() {
    return {
      message: 'Loading items...',
      loadingItems: true,
      orderItems: null,
      itemCount: '---',
      orderId: '---',
      totalCharge: '---'
    };
  },
  created() {
    const oid = this.$route.params.oid;
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
      .catch(errHandler);
  },
  methods: {
    setOrderData(params) {
      this.orderId = params.orderId;
      this.orderItems = params.orderItems;
      this.itemCount = params.itemCount;
      this.totalCharge = `P${Number(params.totalCharge).toFixed(2)}`;
    }
  }
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/fontawesome-free-5.13.0-web/css/all.min.css'
@import '~/assets/css/orderDetails'
</style>
