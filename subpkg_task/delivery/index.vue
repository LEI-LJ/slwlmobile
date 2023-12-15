<template>
  <view class="page-container">
    <view class="receipt-info">
      <uni-file-picker
        v-model="certificatePictureList"
        limit="3"
        title="请拍照上传回单凭证"
      ></uni-file-picker>
      <uni-file-picker
        v-model="deliverPictureList"
        limit="3"
        title="请拍照上传货品照片"
      ></uni-file-picker>
    </view>
    <button :disabled="!isOk" class="button" @click="submit">提交</button>
  </view>
</template>

<script setup>
  import { onLoad } from '@dcloudio/uni-app'
  import { ref, computed } from 'vue'
  import { deliver } from '@/apis/task.js'
  const id = ref('')
  const deliverPictureList = ref([])
  const certificatePictureList = ref([])
  const isOk = computed(() => {
    return (
      deliverPictureList.value.length > 0 &&
      certificatePictureList.value.length > 0
    )
  })
  onLoad((options) => {
    id.value = options.id
  })
  const submit = async () => {
    const res = await deliver({
      id: id.value,
      deliverPictureList: deliverPictureList.value.map((item) => ({
        url: item.url,
      })),
      certificatePictureList: certificatePictureList.value.map((item) => ({
        url: item.url,
      })),
    })
    if (res.code === 200) {
      uni.utils.toast('交付成功')
      uni.navigateBack()
    } else {
      uni.utils.toast('出现错误')
    }
  }
</script>

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

    &[disabled] {
      color: #fff;
      background-color: #fadcd9;
    }
  }
</style>
