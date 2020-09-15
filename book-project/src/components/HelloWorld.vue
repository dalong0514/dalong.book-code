<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button type="primary" @click="stateMent">测试按钮</el-button>
  </div>
</template>

<script>
import { invoices } from '@/dalong/invoices'
import { plays } from '@/dalong/plays'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    test() {
      console.log('dalong')
    },
    stateMent() {
      //  invoices.json 数据是一个数组
      const invoice = invoices[0]
      let totalAmount = 0
      let volumeCredits = 0
      let result = `Statement for ${invoice.customer}\n`
      const format = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumIntegerDigits: 2
      }).format
      for (const perf of invoice.performances) {
        const play = plays[perf.playID]
        let thisAmount = 0

        switch (play.type) {
          case 'tragedy':
            thisAmount = 40000
            if (perf.audience > 30) {
              thisAmount += 1000 * (perf.audience - 30)
            }
            break
          case 'comedy':
            thisAmount = 30000
            if (perf.audience > 20) {
              thisAmount += 10000 + 500 * (perf.audience - 20)
            }
            thisAmount += 300 * perf.audience
            break
          default:
            throw new Error(`unkown type: ${play.type}`)
        }
        // add volume credits
        volumeCredits += Math.max(perf.audience - 30, 0)
        // add extra credit for every ten comedy attendees
        if (play.type === 'comedy') {
          volumeCredits += Math.floor(perf.audience / 5)
        }

        // print line for this order
        result += `${play.name}: ${format(thisAmount / 100)}(${perf.audience} seats)\n`
        totalAmount += thisAmount
      }
      result += `Amount owed is ${format(totalAmount / 100)}\n`
      result += `You earned ${volumeCredits} credits\n`
      console.log(result)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
