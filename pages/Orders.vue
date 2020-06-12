<template>
  <div class="container">
    <h3>
      Recent Orders
    </h3>
    <div class="order-listing">
      <vue-good-table
        mode="remote"
        :is-loading.sync="isLoading"
        :columns="columns"
        :rows="rows"
        :pagination-options="{
          enabled: true,
        }"
        :search-options="{
          enabled: true,
          externalQuery: serverParams.orderId
        }"
        :total-rows="totalRecords"
        @on-page-change="onPageChange"
        @on-sort-change="onSortChange"
        @on-per-page-change="onPerPageChange">
        <div slot="table-actions">
          <input
            v-model="serverParams.orderId"
            type="text"
            class="order-id"
            placeholder="Search order ID">
          <input
            v-model="serverParams.fromDate"
            type="date"
            class="date">
          <input
            v-model="serverParams.toDate"
            type="date"
            class="date">
          <Btn class="filter-btn" text="Filter Orders" @onclick="loadItems" />
          <Btn class="reload-btn" text="Reload Table" @onclick="reloadTable" />
        </div>
      </vue-good-table>
    </div>
  </div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css';
import Btn from '~/components/Btn';
import orderTable from '~/configs/orderTable';
import urls from '~/configs/urls';

export default {
  components: { VueGoodTable, Btn },
  data() {
    return {
      columns: orderTable,
      rows: [],
      totalRecords: 0,
      isLoading: true,
      serverParams: {
        orderId: '',
        fromDate: '',
        toDate: '',
        page: 1,
        perPage: 10
      }
    };
  },
  created() {
    this.loadItems();
  },
  methods: {
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },
    onPageChange(params) {
      this.updateParams({ page: params.currentPage });
      this.loadItems();
    },
    onPerPageChange(params) {
      this.updateParams({ perPage: params.currentPerPage });
      this.loadItems();
    },
    onSortChange(params) {
      this.updateParams({
        sort: [{
          type: params[0].type,
          field: params[0].field
        }]
      });
      this.loadItems();
    },
    loadItems() {
      this.isLoading = true;
      this.$axios.$get(urls.GET_ORDER, { params: this.serverParams })
        .then(({ totalRecords, orders }) => {
          this.isLoading = false;
          this.totalRecords = totalRecords || 0;
          this.rows = orders || [];
        })
        .catch((err) => {
          this.isLoading = false;
          this.totalRecords = 0;
          this.rows = [];
          console.log(err.message);
        });
    },
    reloadTable() {
      this.updateParams({
        page: 1,
        perPage: 10,
        fromDate: '',
        toDate: '',
        orderId: ''
      });
      this.loadItems();
    }
  }
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/orders'
</style>
