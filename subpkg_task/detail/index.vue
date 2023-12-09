<script setup>
  import { onLoad } from '@dcloudio/uni-app'

  import { TaskDetail } from '@/apis/task.js'
  import { ref } from 'vue'
  const taskDetailData = ref({})
  let parameId = ref('')
  const getDetail = async () => {
    // 任务详情数据
    const res = await TaskDetail(parameId.value)
    console.log(res)
    taskDetailData.value = res.data
  }

  onLoad((params) => {
    parameId.value = params.id
    getDetail()
  })
</script>

<template>
  <view class="page-container">
    <view class="search-bar">
      <!-- #ifdef H5 -->
       <text class="iconfont icon-search"></text>
      <!-- #endif -->
      <!-- #ifdef MP -->
      <text class="iconfont icon-scan"></text>
      <!-- #endif -->
      
      <input class="input" type="text" placeholder="输入运单号" />
    </view>
    <scroll-view scroll-y class="task-detail">
      <view class="scroll-view-wrapper">
        <view class="basic-info panel">
          <view class="panel-title">基本信息</view>
          <view class="timeline">
            <view class="line">{{ taskDetailData.startAddress }}8877号</view>
            <view class="line">{{ taskDetailData.endAddress }}</view>
            <navigator
              hover-class="none"
              url="/subpkg_task/guide/index"
              class="guide"
            >
              <text class="iconfont icon-guide"></text>
              <text>开始导航</text>
            </navigator>
          </view>
          <view class="info-list">
            <view class="info-list-item">
              <text class="label">任务编号</text>
              <text class="value">{{ parameId }}</text>
            </view>
            <view class="info-list-item">
              <text class="label">提货联系人</text>
              <text class="value">{{ taskDetailData.startHandoverName }}</text>
            </view>
            <view class="info-list-item">
              <text class="label">联系电话</text>
              <text class="value">{{ taskDetailData.startHandoverPhone }}</text>
            </view>
            <view class="info-list-item">
              <text class="label">预计提货时间</text>
              <text class="value">{{ taskDetailData.planDepartureTime }}</text>
            </view>
            <view class="info-list-item">
              <text class="label">实际提货时间</text>
              <text class="value">{{ taskDetailData.planArrivalTime }}</text>
            </view>

            <view class="hr"></view>

            <view class="info-list-item">
              <text class="label">交付联系人</text>
              <text class="value">{{ taskDetailData.finishHandoverName }}</text>
            </view>
            <view class="info-list-item">
              <text class="label">联系电话</text>
              <text class="value">{{
                taskDetailData.finishHandoverPhone
              }}</text>
            </view>
            <view class="info-list-item">
              <text class="label">预计送达时间</text>
              <text class="value">{{
                taskDetailData.actualDepartureTime || '(#`O′)'
              }}</text>
            </view>
            <view class="info-list-item">
              <text class="label">实际送达时间</text>
              <text class="value">{{
                taskDetailData.actualArrivalTime || '(#`O′)'
              }}</text>
            </view>
          </view>
        </view>

        <view class="except-info panel">
          <view class="panel-title">异常信息</view>
          <view class="info-list">
            <view class="info-list-item">
              <text class="label">上报时间</text>
              <text class="value">2022.05.04 13:00</text>
            </view>
            <view class="info-list-item">
              <text class="label">异常类型</text>
              <text class="value">有异常响动</text>
            </view>
            <view class="info-list-item">
              <text class="label">处理结果</text>
              <text class="value">继续运输</text>
            </view>
          </view>
          <view class="info-list">
            <view class="info-list-item">
              <text class="label">上报时间</text>
              <text class="value">2022.05.04 13:00</text>
            </view>
            <view class="info-list-item">
              <text class="label">异常类型</text>
              <text class="value">有异常响动</text>
            </view>
            <view class="info-list-item">
              <text class="label">处理结果</text>
              <text class="value">继续运输</text>
            </view>
          </view>
        </view>

        <view class="panel pickup-info">
          <view class="panel-title">提货信息</view>
          <view class="label">提货凭证</view>
          <view class="pictures">
            <image class="picture" src="" mode=""></image>
            <image class="picture" src="" mode=""></image>
            <image class="picture" src="" mode=""></image>
            <view v-if="false" class="picture-blank">暂无图片</view>
          </view>
          <view class="label">货品照片</view>
          <view class="pictures">
            <image class="picture" src="" mode=""></image>
            <image class="picture" src="" mode=""></image>
            <image class="picture" src="" mode=""></image>
            <view v-if="false" class="picture-blank">暂无图片</view>
          </view>
        </view>

        <view class="delivery-info panel">
          <view class="panel-title">交货信息</view>
          <view class="label">交货凭证</view>
          <view class="pictures">
            <image class="picture" src="" mode=""></image>
            <image class="picture" src="" mode=""></image>
            <image class="picture" src="" mode=""></image>
            <view v-if="false" class="picture-blank">暂无图片</view>
          </view>
          <view class="label">货品照片</view>
          <view class="pictures">
            <image class="picture" src="" mode=""></image>
            <image class="picture" src="" mode=""></image>
            <image class="picture" src="" mode=""></image>
            <view v-if="false" class="picture-blank">暂无图片</view>
          </view>
        </view>
      </view>
      
    </scroll-view>

    <view class="toolbar" v-if="true">
      <navigator
        url="/subpkg_task/delay/index"
        hover-class="none"
        class="button secondary"
        >延迟提货</navigator
      >
      <navigator
        url="/subpkg_task/pickup/index"
        hover-class="none"
        class="button primary"
        >提货</navigator
      >
    </view>
    <view class="toolbar" v-if="false">
      <navigator
        url="/subpkg_task/except/index"
        hover-class="none"
        class="button secondary"
        >异常上报
      </navigator>
      <navigator
        url="/subpkg_task/delivery/index"
        hover-class="none"
        class="button primary"
        >支付</navigator
      >
    </view>
    <view class="toolbar" v-if="false">
      <navigator
        url="/subpkg_task/record/index"
        hover-class="none"
        class="button primary block"
        >回车登记</navigator
      >
    </view>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
