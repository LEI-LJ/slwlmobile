<script setup>
 
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import { UserTruckInfo } from '@/apis/user.js'
  const truchInfo = ref({})
  const getData = async () => {
    // debugger
    const res = await UserTruckInfo()
    truchInfo.value = res.data
  }
  onLoad(() => {
    getData()
  })
  
</script>

<template>
  <view class="page-container">
    <swiper
      class="truck-pictures"
      indicator-active-color="#fff"
      circular
      indicator-dots
    >
      <swiper-item v-for="item in truchInfo.pictureList">
        <image
          class="picture"
          mode="aspectFill"
          :src="item.url || '/static/uploads/truck_picture.jpg'"
        ></image>
      </swiper-item>
      <!-- <swiper-item>
        <image
          class="picture"
          mode="aspectFill"
          src="/static/uploads/truck_picture.jpg"
        ></image>
      </swiper-item> -->
    </swiper>
    <view class="truck-meta">
      <uni-list :border="false">
        <uni-list-item
          :border="false"
          title="车辆编号"
          rightText="3092889699900293"
        />
        <uni-list-item
          :border="false"
          title="车辆号牌"
          :rightText="truchInfo.licensePlate"
        />
        <uni-list-item
          :border="false"
          title="车型"
          :rightText="truchInfo.truckType"
        />
        <uni-list-item
          :border="false"
          title="所属机构"
          :rightText="truchInfo.currentOrganName"
        />
        <uni-list-item
          :border="false"
          title="载重"
          :rightText="truchInfo?.allowableLoad?.split('.')[0] + '吨'"
        />
      </uni-list>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
