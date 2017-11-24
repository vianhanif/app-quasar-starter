export default {
  dateFrom: {
    name: 'dateFrom',
    value: ''
  },
  dateTo: {
    name: 'dateTo',
    value: ''
  },
  table: {
    search: '',
    pagination: {
      sortBy: 'num',
      rowPerPage: 25,
      descending: true
    },
    headers: [
      {
        text: 'No',
        align: 'left',
        sortable: true,
        value: 'num'
      },
      {
        text: 'Valid Hingga',
        align: 'center',
        value: 'date'
      },
      {
        text: 'Pengirim',
        align: 'left',
        value: 'name'
      },
      {
        text: 'No. HP',
        align: 'center',
        value: 'no_hp'
      },
      {
        text: 'Nama Bank',
        align: 'center',
        value: 'bank_name'
      },
      {
        text: 'No Rekening',
        align: 'center',
        value: 'bank_account'
      },
      {
        text: 'Status',
        align: 'center',
        value: 'status'
      },
      {
        text: 'Opsi',
        sortable: false,
        align: 'center',
        value: 'info'
      }
    ],
    items: [
    ]
  }
}
