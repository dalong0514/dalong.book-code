import { createStatementData } from '@/code/createStatementData'

function usd(aNumber) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumIntegerDigits: 2
  }).format(aNumber / 100)
}

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`
  for (const perf of data.performances) {
    // print line for this order
    result += `${perf.play.name}: ${usd(perf.amount)}(${perf.audience} seats)\n`
  }

  result += `Amount owed is ${usd(data.totalAmount)}\n`
  result += `You earned ${data.totalVolumeCredits} credits\n`
  console.log(result)
  return usd(data.totalAmount)
}

export function statement() {
  return renderPlainText(createStatementData())
}
