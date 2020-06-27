export default [
  {
    label: 'Order Number',
    field: 'orderId',
    sortable: false
  },
  {
    label: 'Total Quantity',
    field: 'totalQty',
    sortable: false
  },
  {
    label: 'Total Charge',
    field: row => `₱${Number(row.totalCharge).toFixed(2)}`,
    sortable: false
  },
  {
    label: 'Date Placed',
    field: 'date',
    sortable: false
  }
];
