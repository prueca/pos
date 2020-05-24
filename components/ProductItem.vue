<template>
  <div class="item">
    <div class="row clearfix">
      <div class="name">
        {{ name }}
      </div>
      <div class="float-left">
        In stock: {{ stock }}
      </div>
      <div class="float-right">
        P{{ Number(price).toFixed(2) }}
      </div>
    </div>
    <div class="row clearfix">
      <input
        v-model="qty"
        class="float-left qty"
        type="number"
        min="1"
        @change="qtyChange">
      <div class="float-right">
        P{{ (qty * price).toFixed(2) }}
      </div>
    </div>
    <div class="row btn-grp">
      <Btn text="Buy" />
      <Btn text="Stock" />
      <Btn text="Edit" />
      <Btn text="Delete" />
    </div>
  </div>
</template>

<script>
import Btn from '~/components/Btn';
export default {
  name: 'ProductItem',
  components: { Btn },
  props: ['name', 'price', 'stock'],
  data: () => ({
    qty: 1
  }),
  methods: {
    qtyChange(evt) {
      this.qty = evt.target.value;
    }
  }
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/productItem'
</style>
