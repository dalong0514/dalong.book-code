const invoices = {
  customer: 'BigCo',
  performances: [
    {
      playID: 'hamlet',
      audience: 55
    },
    {
      playID: 'as­like',
      audience: 35
    },
    {
      playID: 'othello',
      audience: 40
    }
  ]
}

const plays = {
  hamlet: {
    name: 'Hamlet',
    type: 'tragedy'
  },
  aslike: {
    name: 'As You Like It',
    type: 'comedy'
  },
  othello: {
    name: 'Othello',
    type: 'tragedy'
  }
}

export default { invoices, plays }
