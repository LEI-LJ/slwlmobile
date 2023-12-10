<script setup>
  import { delayReasonModify } from '@/apis/task.js'
  import { onLoad } from '@dcloudio/uni-app'
  import { computed, ref } from 'vue'
  const id = ref('')
  const startTime = ref('')
  const planeTime = ref('')
  const selectTime = ref('')
  const delayReason = ref('')

  const isError = ref(true)
  onLoad((options) => {
    planeTime.value = options.planeTime

    id.value = options.id
  })
  const handleSelectTime = (e) => {
    selectTime.value = planeTime.value.split(' ')[0] + ' ' + e.detail.value
    startTime.value = new Date(planeTime.value)
    if (
      new Date(selectTime.value) - startTime.value <= 7200 * 1000 &&
      new Date(selectTime.value) - startTime.value > 0
    ) {
      console.log('时间合格')
      isError.value = false
    } else {
      uni.utils.toast('时间不合法')
      isError.value = true
    }
  }
  const delayReasonLength = computed(() => {
    return delayReason.value.length
  })
  const isOk = computed(() => {
    console.log(delayReason.value.length)
    return (
      delayReason.value.length < 50 &&
      delayReason.value.length > 0 &&
      !isError.value
    )
  })
  const submitBtn = async () => {
    const res = await delayReasonModify({
      delayReason: delayReason.value,
      delayTime: selectTime.value,
      id: id.value,
    })
    console.log(res)
    if (res.code !== 200) return uni.utils.toast('延迟提货失败,请联系管理员')
    uni.utils.toast('成功')
    uni.navigateBack()
  }

  // const arrObj = ['name', 'color', '你好']
  // console.log(Object.prototype.toString.call(arrObj))
</script>

<template>
  <view class="page-container">
    <uni-list :border="false">
      <uni-list-item
        title="原定时间 "
        showArrow
        :rightText="planeTime || '2022-05-04 13:00:00'"
      />
      <uni-list-item title="延迟时间" showArrow>
        <template v-slot:footer>
          <picker @change="handleSelectTime" class="time-picker" mode="time">
            <text :class="{ DelLine: isError }" v-if="selectTime"
              >{{ selectTime }}:00</text
            >
            <text v-else>不可超过2个小时</text>
          </picker>
        </template>
      </uni-list-item>
      <uni-list-item direction="column">
        <template v-slot:body>
          <view class="textarea-wrapper">
            <textarea
              v-model="delayReason"
              class="textarea"
              placeholder-style="color: #818181"
              placeholder="请输入延迟提货原因"
            ></textarea>
            <text
              class="words-count"
              :class="{ DelLine: delayReasonLength > 50 }"
              >{{ delayReasonLength }}/50</text
            >
          </view>
        </template>
      </uni-list-item>
      <uni-list-item :border="false">
        <template v-slot:body>
          <button :disabled="!isOk" @click="submitBtn" class="button">
            提交
          </button>
        </template>
      </uni-list-item>
    </uni-list>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
  .DelLine {
    color: red !important;
    text-decoration: line-through;
  }
</style>
