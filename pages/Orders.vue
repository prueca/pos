<template>
  <div class="container">
    <h3>
      Recent Orders
    </h3>
    <div class="order-listing">
      <vue-good-table
        :columns="columns"
        :rows="rows" />
    </div>
  </div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css';
import orderTable from '~/configs/orderTable';
import urls from '~/configs/urls';

export default {
  components: { VueGoodTable },
  data() {
    return {
      columns: orderTable,
      rows: []
    };
  },
  created() {
    this.$axios.$get(urls.GET_ORDER)
      .then((res) => {
        this.rows = res.orders || [];
      })
      .catch(err => console.log(err.message));
  }
};
</script>
