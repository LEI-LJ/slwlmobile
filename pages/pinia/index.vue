<script setup>
  import PiniaCom from './piniaCom'
  import { storeToRefs } from 'pinia'
  import { useCounterStore } from '@/store/counter.js'
  const counterStroe = useCounterStore()
  const { number } = storeToRefs(counterStroe)
  const { subNumber, addNumber } = counterStroe
  // console.log(counterStore)
</script>
<template>
  <view class="counter">
    <button @click="subNumber" class="button" type="primary">-</button>
    <input class="input" type="text" :value="number" />
    <button @click="addNumber" class="button" type="primary">+</button>                                                       
  </view>
  <view class="">
    <view class="">组件的数字 </view>
    <PiniaCom></PiniaCom>
  </view>
</template>

<style lang="scss" scoped>
  .counter {
    display: flex;
    padding: 100rpx;
  }

  .input {
    flex: 1;
    height: 96rpx;
    text-align: center;
    border: 2rpx solid #eee;
    box-sizing: border-box;
  }

  .button {
    width: 100rpx;
    margin: 0;

    &:first-child {
      border-start-end-radius: 0;
      border-end-end-radius: 0;
    }
    &:last-child {
      border-start-start-radius: 0;
      border-end-start-radius: 0;
    }
  }
</style>
