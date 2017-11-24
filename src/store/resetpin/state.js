export default {
  phonenumber: {
    value: ''
  },
  osticket: {
    value: ''
  },
  dateFrom: {
    value: ''
  },
  dateTo: {
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
        text: 'Date Created',
        align: 'center',
        value: 'date'
      },
      {
        text: 'OS Ticket',
        value: 'os_ticket',
        align: 'left'
      },
      {
        text: 'No. HP',
        value: 'no_hp',
        align: 'center'
      },
      {
        text: 'Status',
        value: 'status',
        align: 'center'
      },
      {
        text: 'OTP Valid hingga',
        value: 'otpExpired',
        align: 'center'
      },
      {
        text: 'Opsi',
        value: 'info',
        sortable: false,
        align: 'center'
      }
    ],
    items: [
    ]
  }
}
