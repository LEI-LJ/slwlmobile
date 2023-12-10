<script setup>
  import { onLoad } from '@dcloudio/uni-app'
  import { takeDelivery } from '@/apis/task.js'
  import { computed, ref } from 'vue'
  const cargoPickUpPictureList = ref([])
  const cargoPictureList = ref([])
  const id = ref('')
  const submit = async () => {
   await takeDelivery({
      id: id.value,
      cargoPickUpPictureList: cargoPickUpPictureList.value.map((item) => {
        return { url: item.url }
      }),
      cargoPictureList: cargoPictureList.value.map((item) => {
        return { url: item.url }
      }),
    })
    uni.utils.toast('提货成功')
    uni.navigateBack()
  }
  const isok = computed(() => {
    return (
      cargoPickUpPictureList.value.length > 0 &&
      cargoPictureList.value.length > 0
    )
  })
  onLoad((options) => {
    console.log(options)
    id.value = options.id
  })
</script>
<script>

</script>
<template>
  <view class="page-container">
    <view class="receipt-info">
      <uni-file-picker
        v-model="cargoPickUpPictureList"
        limit="3"
        title="请拍照上传回单凭证"
      ></uni-file-picker>
      <uni-file-picker
        v-model="cargoPictureList"
        limit="3"
        title="请拍照上传货品照片"
      ></uni-file-picker>
    </view>
    <button @click="submit" :disabled="!isok" class="button">提交</button>
  </view>
</template>

<style lang="scss" scoped>
  .page-container {
    padding: 30rpx;
  }

  .receipt-info {
    min-height: 600rpx;
    background-color: #fff;
    padding: 20rpx 30rpx;
    border-radius: 16rpx;

    ::v-deep .uni-file-picker {
      margin-bottom: 30rpx;
    }
  }

  .button {
    height: 100rpx;
    text-align: center;
    line-height: 100rpx;
    /* #ifdef APP */
    padding-top: 4rpx;
    /* #endif */
    border-radius: 100rpx;
    margin-top: 60rpx;
    color: #fff;
    font-size: $uni-font-size-big;
    background-color: $uni-primary;

    &[disabled],
    &.disabled {
      color: #fff;
      background-color: #fadcd9;
    }
  }
</style>
