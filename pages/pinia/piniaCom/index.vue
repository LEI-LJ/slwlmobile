<template>
  <div>数字名称:{{ number }}</div>
  <div>{{ counterStore.isNumber.isTrue ? '我是true' : '我是flase' }}</div>
</template>

<script setup>
  import { useCounterStore } from '@/store/counter.js'
  import { storeToRefs } from 'pinia'

  const counterStore = useCounterStore()
  const { number } = storeToRefs(counterStore)
</script>

<style scoped></style>
