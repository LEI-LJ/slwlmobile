<script setup>
  import { ref } from 'vue'
  import slUniCalendar from './components/sl-uni-calendar/sl-uni-calendar'
  const date = ref({})
  const startDate = (e) => {
    console.log(e)
    date.value = {
      year: e.year,
      month: e.month,
    }
  }
  // console.log(startDate)
</script>

<template>
  <view class="page-container">
    <sl-uni-calendar
      :show-month="false"
      @confirm="startDate"
      @change="startDate"
      @monthSwith="startDate"
    >
      <view class="data-overview">
        <view class="item">
          <text class="volumn">18</text>
          <text class="label">任务总量</text>
        </view>
        <view class="item">
          <text class="volumn">16</text>
          <text class="label">完成任务量</text>
        </view>
        <view class="item">
          <text class="volumn">3987</text>
          <text class="label">运输里程(km)</text>
        </view>
      </view>
    </sl-uni-calendar>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
