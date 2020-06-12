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
        :total-rows="totalRecords"
        @on-page-change="onPageChange"
        @on-sort-change="onSortChange"
        @on-column-filter="onColumnFilter"
        @on-per-page-change="onPerPageChange">
        <div slot="table-actions">
          <Btn class="reload-btn" text="Reload Table" />
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
        columnFilters: {
        },
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
    onColumnFilter(params) {
      this.updateParams(params);
      this.loadItems();
    },
    loadItems() {
      this.$axios.$get(urls.GET_ORDER, { params: this.serverParams })
        .then((res) => {
          this.totalRecords = res.totalRecords;
          this.rows = res.orders || [];
        })
        .catch(err => console.log(err.message));
    }
  }
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/orders'
</style>
