<script setup>
  import { onLoad } from '@dcloudio/uni-app'
  import { getMessageList, noReadQuantity } from '@/apis/message.js'

  import { ref } from 'vue'
  const MessageList = ref([])
  let allPages = 1
  let currentPage = 1
  const getMessageListData = async () => {
    const res = await getMessageList(201, currentPage)
    console.log(res)
    MessageList.value = [...MessageList.value, ...res.data.items]
    allPages = +res.data.pages
  }
  const NoReadQuantity = ref(0)
  const getNoReadQuantity = async () => {
    const res = await noReadQuantity(201)
    NoReadQuantity.value = res.data
  }
  onLoad(() => {
    getMessageListData()
    getNoReadQuantity()
  })

  function scrolltolower() {
    console.log('----到底了--')
    if (currentPage >= allPages) return uni.utils.toast('已经到底了')
    currentPage++
    getMessageListData()
  }
  // 已读事件
  const ReadEvent = (id) => {
    const currentVal = MessageList.value.find((item) => {
      return item.id === id
    })
    currentVal.isRead = 1
  }
  const refresherState = ref(false)
  const onRefreesher = async () => {
    console.log('触发刷新')
    refresherState.value = true
    currentPage = 1
    // 列表为空
    MessageList.value = []
    await getMessageListData()
    refresherState.value = false
  }
</script>
<template>
  <scroll-view
    @scrolltolower="scrolltolower"
    @refresherrefresh="onRefreesher"
    :refresher-triggered="refresherState"
    class="scroll-view"
    refresher-enabled
    scroll-y
  >
    <view class="scroll-view-wrapper">
      <view class="message-action">
        <text class="iconfont icon-clear">{{ NoReadQuantity }}</text>
        全部已读
      </view>
      <uni-card
        v-for="item in MessageList"
        :key="item.id"
        :border="false"
        :is-shadow="false"
      >
        <view class="brief">{{ item.content }}</view>
        <view class="extra">
          <text class="time">{{ item.created }}</text>
          <navigator
            hover-class="none"
            class="link"
            @click="ReadEvent(item.id)"
            :url="`/subpkg_message/content/index?id=${item.id}`"
            >查看详情</navigator
          >
        </view>
        <template v-slot:title>
          <view class="title" :class="{ unread: item.isRead === 0 }">{{
            item.title
          }}</view>
        </template>
      </uni-card>
      <!-- <uni-card :border="false" :is-shadow="false">
        <view class="brief">运输车辆：京A 123456 运输路线：北京—广州</view>
        <view class="extra">
          <text class="time">2022.05.04 13:00</text>
          <navigator
            hover-class="none"
            class="link"
            url="/subpkg_message/content/index"
            >查看详情</navigator
          >
        </view>
        <template v-slot:title>
          <view class="title">您有新的运输任务</view>
        </template>
      </uni-card>
      <uni-card :border="false" :is-shadow="false">
        <view class="brief">运输车辆：京A 123456 运输路线：北京—广州</view>
        <view class="extra">
          <text class="time">2022.05.04 13:00</text>
          <navigator
            hover-class="none"
            class="link"
            url="/subpkg_message/content/index"
            >查看详情</navigator
          >
        </view>
        <template v-slot:title>
          <view class="title">您有新的运输任务</view>
        </template>
      </uni-card>
      <uni-card :border="false" :is-shadow="false">
        <view class="brief">运输车辆：京A 123456 运输路线：北京—广州</view>
        <view class="extra">
          <text class="time">2022.05.04 13:00</text>
          <navigator
            hover-class="none"
            class="link"
            url="/subpkg_message/content/index"
            >查看详情</navigator
          >
        </view>
        <template v-slot:title>
          <view class="title">您有新的运输任务</view>
        </template>
      </uni-card> -->
      <view v-if="MessageList.length <= 0" class="message-blank">暂无消息</view>
    </view>
  </scroll-view>
</template>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
