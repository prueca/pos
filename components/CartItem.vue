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
      <Btn type="button" text="-" @onclick="decrease" />
      <TextInput :value="cartItem.quantity" text-align="center" @onchange="qtyChange" />
      <Btn type="button" text="+" @onclick="increase" />
    </div>
    <div class="col">
      <div class="item-total">
        P{{ Number(cartItem.itemTotal).toFixed(2) }}
      </div>
    </div>
    <div class="col">
      <Btn
        class="remove-btn"
        type="button"
        text="Remove"
        :loading="removing"
        :disabled="placingOrder"
        @onclick="updateQty(0, 'removing')" />
      <Btn
        class="update-btn"
        type="button"
        text="Update"
        :loading="updating"
        :disabled="placingOrder"
        @onclick="updateQty(cartItem.quantity)" />
    </div>
  </div>
</template>

<script>
import urls from '../configs/urls';
import TextInput from '~/components/TextInput';
import Btn from '~/components/Btn';

export default {
  name: 'CartItem',
  components: { Btn, TextInput },
  props: ['cartItem', 'oid', 'placingOrder'],
  data: () => ({
    updating: false,
    removing: false
  }),
  methods: {
    qtyChange(evt) {
      const val = Number(evt.target.value) > 0 ? evt.target.value : 1;
      this.cartItem.quantity = val;
      evt.target.value = val;
    },
    increase() {
      this.cartItem.quantity += 1;
    },
    decrease() {
      if (this.cartItem.quantity - 1 > 0) {
        this.cartItem.quantity -= 1;
      }
    },
    updateQty(qty, op = 'updating') {
      this[op] = true;
      this.$axios.$post(urls.UPDATE_QTY, {
        oid: Number(this.oid),
        pid: Number(this.cartItem.product.productId),
        qty: Number(qty)
      })
        .then((res) => {
          this[op] = false;

          if (res.message) {
            alert(res.message);
            return;
          }

          if (!res.order || res.order.orderItems.length < 1) {
            this.$emit('emptyCart');
            return;
          }

          this.$emit('setOrderData', res.order);
        })
        .catch((err) => {
          this[op] = false;
          alert(err.message);
        });
    }
  }
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/cartItem'
</style>
