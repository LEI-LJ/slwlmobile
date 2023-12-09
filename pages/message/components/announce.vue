<script setup>
  import { onLoad } from '@dcloudio/uni-app'
  import { ref } from 'vue'
  import { getMessageList } from '@/apis/message.js'
  let currentPagee = 1
  // 公共列表
  const announceList = ref([])
  const getAnnounceList = async () => {
    const res = await getMessageList(200, currentPagee)
    console.log(res);
    announceList.value = res.data.items
    console.log(announceList.value)
  }
  onLoad(() => {
    getAnnounceList()
  })
</script>
<template>
  <scroll-view class="scroll-view" refresher-enabled scroll-y>
    <view class="scroll-view-wrapper">
      <view class="message-action">
        <text class="iconfont icon-clear"></text>
        全部已读
      </view>
      <uni-list :border="false">
        <uni-list-item
          v-for="item in announceList"
          :key="item.id"
          :to="`/subpkg_message/content/index?id=${item.id}`"
          ellipsis="1"
          :title="item.title"
          rightText="05-06 06:16"
        >
          <template slot:header>
            <text class="dot"></text>
          </template>
        </uni-list-item>
        <!-- <uni-list-item
          to="/subpkg_message/content/index"
          ellipsis="1"
          title="在营车辆年检通知，为保障车辆能在营车辆年检通知，为保障车辆能够"
          rightText="05-06 06:16"
        />
        <uni-list-item
          to="/subpkg_message/content/index"
          ellipsis="1"
          title="在营车辆年检通知，为保障车辆能在营车辆年检通知，为保障车辆能够"
          rightText="05-06 06:16"
        />
        <uni-list-item
          to="/subpkg_message/content/index"
          ellipsis="1"
          title="在营车辆年检通知，为保障车辆能在营车辆年检通知，为保障车辆能够"
          rightText="05-06 06:16"
        />
        <uni-list-item
          to="/subpkg_message/content/index"
          ellipsis="1"
          title="在营车辆年检通知，为保障车辆能在营车辆年检通知，为保障车辆能够"
          rightText="05-06 06:16"
        /> -->
      </uni-list></view
    >
  </scroll-view>
</template>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
