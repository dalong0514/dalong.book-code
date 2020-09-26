import { invoices, plays } from '@/code/data'

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`
  for (const perf of data.performances) {
    // print line for this order
    result += `${perf.play.name}: ${usd(amountFor(perf))}(${perf.audience} seats)\n`
  }

  result += `Amount owed is ${usd(totalAmount())}\n`
  result += `You earned ${totalVolumeCredits()} credits\n`
  console.log(result)
  return usd(totalAmount())

  function amountFor(aPerformance) {
    let result = 0

    switch (aPerformance.play.type) {
      case 'tragedy':
        result = 40000
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30)
        }
        break
      case 'comedy':
        result = 30000
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20)
        }
        result += 300 * aPerformance.audience
        break
      default:
        throw new Error(`unkown type: ${aPerformance.play.type}`)
    }
    return result
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0
    // add volume credits
    result += Math.max(aPerformance.audience - 30, 0)
    // add extra credit for every ten comedy attendees
    if (aPerformance.play.type === 'comedy') {
      result += Math.floor(aPerformance.audience / 5)
    }
    return result
  }

  function usd(aNumber) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumIntegerDigits: 2
    }).format(aNumber / 100)
  }

  function totalVolumeCredits() {
    let volumeCredits = 0
    for (const perf of data.performances) {
      // add volume credits
      volumeCredits += volumeCreditsFor(perf)
    }
    return volumeCredits
  }

  function totalAmount() {
    let result = 0
    for (const perf of data.performances) {
      result += amountFor(perf)
    }
    return result
  }
}

export function statement() {
  const statementData = {}
  statementData.customer = invoices.customer
  statementData.performances = invoices.performances.map(enrichPerformance)
  return renderPlainText(statementData)

  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance)
    result.play = playFor(aPerformance)
    return result
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID]
  }
}
