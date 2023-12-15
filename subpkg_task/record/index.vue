<script setup>
  import { useTaskStore } from '@/store/task.js'
  import { computed, ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import slVehicleViolation from './components/vehicle-violation'
  import slVehicleBreakdown from './components/vehicle-breakdown'
  import slVehicleAccident from './components/vehicle-accident'
  
  import { storeToRefs } from 'pinia'
  const { recordData } = storeToRefs(useTaskStore())
  const { submit } = useTaskStore()
  // 回车时间
  // const dataTimePicker = ref('')
  onLoad((options) => {
    recordData.value.startTime = options.startTime
    recordData.value.id = options.id
  })
  // recordData.value.endTime = dataTimePicker.value

  const isOk = computed(() => {
    return (
      recordData.value.endTime.length > 0 &&
      recordData.value.startTime.length > 0
    )
  })
  console.log(submit)
</script>
<template>
  <view class="page-container">
    <scroll-view class="scroll-view" scroll-y>
      <view class="scroll-view-wrapper">
        <uni-list class="base-info">
          <uni-list-item
            title="出车时间"
            show-arrow
            :right-text="recordData.startTime"
          />
          <uni-list-item show-arrow title="回车时间">
            <template v-slot:footer>
              <uni-datetime-picker v-model="recordData.endTime">
                <view class="picker-value">{{
                  recordData.endTime || '请选择'
                }}</view>
              </uni-datetime-picker>
            </template>
          </uni-list-item>
        </uni-list>
        <sl-vehicle-violation></sl-vehicle-violation>
        <sl-vehicle-breakdown></sl-vehicle-breakdown>
        <sl-vehicle-accident></sl-vehicle-accident>
      </view>
    </scroll-view>
    <view class="toolbar">
      <button :disabled="!isOk" @click="submit" class="button">提交登记</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
