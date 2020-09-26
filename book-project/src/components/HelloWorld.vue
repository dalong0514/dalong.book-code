<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button type="primary" @click="statement">测试按钮</el-button>
  </div>
</template>

<script>
import { statement } from '@/code/statement'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    test() {
      console.log('dalong')
    },
    statement
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
