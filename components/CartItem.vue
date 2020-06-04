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
      <TextInput :value="cartItem.quantity" text-align="center" @onchange="qtyChange" />
      <Btn type="button" text="+" />
    </div>
    <div class="col">
      <div class="item-total">
        P{{ Number(cartItem.itemTotal).toFixed(2) }}
      </div>
    </div>
    <div class="col">
      <Btn class="remove-btn" type="button" text="Remove" />
      <Btn
        class="update-btn"
        type="button"
        text="Update"
        :loading="updating"
        @onclick="updateQty" />
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
  props: ['cartItem', 'oid'],
  data: () => ({
    updating: false
  }),
  methods: {
    qtyChange(evt) {
      this.cartItem.quantity = Number(evt.target.value) > 0 ? evt.target.value : 1;
    },
    updateQty() {
      this.updating = true;
      this.$axios.$post(urls.UPDATE_QTY, {
        oid: Number(this.oid),
        itemId: Number(this.cartItem.itemId),
        qty: Number(this.cartItem.quantity)
      })
        .then((res) => {
          this.updating = false;
          this.$emit('setOrderData', res.order);
        })
        .catch((err) => {
          this.updating = false;
          alert(err.message);
        });
    }
  }
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/cartItem'
</style>
