<script setup>
  import { getTaskList } from '@/apis/task.js'
  import { onLoad } from '@dcloudio/uni-app'
  import { ref } from 'vue'
  const TaskList = ref([])
  // 当前页
  let currentPage = 1
  // 记录总页数
  let allPages = 1
  // 下拉刷新的开关
  const triggers = ref(false)
  const getList = async () => {
    const res = await getTaskList(1, currentPage)
    console.log(res)
    TaskList.value = [...TaskList.value, ...res.data.items]
    allPages = +res.data.pages
  }
  onLoad(() => {
    getList()
  })
  // const statusText = computed(() => {})
  const onLower = () => {
    if (currentPage >= allPages) return uni.utils.toast('已经到底了')
    currentPage++
    getList()
  }
  //
  const onRefresher = async () => {
    triggers.value = true
    TaskList.value = []
    currentPage = 1
    await getList()
    triggers.value = false
  }
</script>

<template>
  <scroll-view
    @scrolltolower="onLower"
    @refresherrefresh="onRefresher"
    :refresher-triggered="triggers"
    scroll-y
    refresher-enabled
    class="scroll-view"
  >
    <view class="scroll-view-wrapper">
      <view v-for="item in TaskList" :key="item.id" class="task-card">
        <navigator
          hover-class="none"
          :url="`/subpkg_task/detail/index?id=${item.id}`"
        >
          <view class="header">
            <text class="no">任务编号: {{ item.transportTaskId }}</text>
            <text class="status">已延迟</text>
          </view>
          <view class="body">
            <view class="timeline">
              <view class="line">{{ item.startAddress }}</view>
              <view class="line">{{ item.endAddress }}99号</view>
            </view>
          </view>
        </navigator>
        <view class="footer">
          <view class="label">提货时间</view>
          <view class="time">{{ item.planArrivalTime }}</view>
          <button :disabled="!item.enablePickUp" class="action">提货</button>
        </view>
      </view>
      <!-- <view class="task-card">
        <navigator hover-class="none" url="/subpkg_task/detail/index?id=001">
          <view class="header">
            <text class="no">任务编号: XAHH1234567</text>
          </view>
          <view class="body">
            <view class="timeline">
              <view class="line"
                >北京市昌平区回龙观街道西三旗桥东金燕龙写字楼8877号</view
              >
              <view class="line">河南省郑州市路北区北清路99号</view>
            </view>
          </view>
        </navigator>
        <view class="footer">
          <view class="label">提货时间</view>
          <view class="time">2022.05.04 13:00</view>
          <button disabled class="action">提货</button>
        </view>
      </view> -->
      <view v-if="false" class="task-blank">无待提货物</view>
    </view>
  </scroll-view>
</template>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
