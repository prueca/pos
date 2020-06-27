<template>
  <div class="container">
    <vue-good-table
      class="order-listing"
      mode="remote"
      :is-loading.sync="isLoading"
      :columns="columns"
      :rows="rows"
      :pagination-options="{
        enabled: true,
        mode: 'pages',
        setCurrentPage: serverParams.page
      }"
      :search-options="{
        enabled: true,
        externalQuery: serverParams.orderId
      }"
      :total-rows="totalRecords"
      @on-page-change="onPageChange"
      @on-per-page-change="onPerPageChange">
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'orderId'">
          <nuxt-link
            class="order-id"
            :to="`/orders/${props.formattedRow[props.column.field]}`">
            {{ props.formattedRow[props.column.field] }}
          </nuxt-link>
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
      <div slot="table-actions">
        <input
          v-model="serverParams.orderId"
          type="text"
          class="order-id-field"
          placeholder="Search order ID">
        <input
          v-model="serverParams.fromDate"
          type="date"
          class="date">
        <input
          v-model="serverParams.toDate"
          type="date"
          class="date">
        <Btn
          class="filter-btn"
          icon="fas fa-fw fa-filter"
          @onclick="loadItems" />
        <Btn
          class="reload-btn"
          icon="fas fa-fw fa-redo"
          @onclick="reloadTable" />
      </div>
    </vue-good-table>
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
      this.currentPage = 1;
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
