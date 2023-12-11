<script setup>
  import { ref, computed, reactive } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import { reportException } from '@/apis/task.js'
  // 组件 ref
  const popup = ref(null)
  const id = ref('')
  // 定义 popup 组件展示的数据
  const exceptionTypes = reactive([
    '发动机启动困难',
    '不着车，漏油',
    '照明失灵',
    '排烟异常、温度异常',
    '其他问题',
  ])
  // 文件提示
  const exceptTime = computed(() => {
    return timePicker.value || '请选择'
  })
  //异常描述
  const anomalyDescription = ref('')
  //异常图片
  const exceptionImagesList = ref([])
  const exceptionCheck = ref([])
  // 异常日期
  const timePicker = ref('')
  // 选择的位置
  const selectLocation = ref('')
  // 打开地图
  function onLocationChoose() {
    uni.chooseLocation({
      success: (res) => {
        console.log(res)
        // console.log(res.name)
        selectLocation.value = res.name
      },
    })
  }
  const locationText = computed(() => {
    return selectLocation.value || '请选择'
  })

  // 点击类型弹层确认按钮
  function onPopupConfirm() {
    popup.value.close()
  }
  onLoad((options) => {
    id.value = options.id
  })

  // 打开弹层
  function onPopupOpen() {
    popup.value.open()
  }
  const checkBoxSelect = (e) => {
    console.log(e.detail.value)
    exceptionCheck.value = e.detail.value
  }
  const isOk = computed(() => {
    return (
      timePicker.value.length > 0 &&
      exceptionCheck.value.length > 0 &&
      selectLocation.value.length > 0
    )
  })
  const uploadSuccessImg = (e) => {
    console.log(e)
    exceptionImagesList.value = e.tempFilePaths
  }
  const submit = async () => {
    const res = await reportException({
      transportTaskId: id.value,
      exceptionTime: timePicker.value,
      exceptionPlace: selectLocation.value,
      exceptionType: exceptionCheck.value,
      exceptionDescribe: anomalyDescription.value,
      exceptionImagesList: exceptionImagesList.value,
    })
    if (res.code === 200) {
      uni.utils.toast('上报成功')
      uni.navigateBack()
    } else {
      uni.utils.toast('上报失败')
    }
  }
</script>

<template>
  <view class="page-container">
    <scroll-view class="scroll-view" scroll-y>
      <view style="margin: 30rpx" class="scroll-view-wrapper">
        <uni-list :border="false">
          <uni-list-item show-arrow title="异常时间">
            <template v-slot:footer>
              <uni-datetime-picker v-model="timePicker">
                <view class="picker-value">{{ exceptTime }}</view>
              </uni-datetime-picker>
            </template>
          </uni-list-item>

          <uni-list-item
            show-arrow
            clickable
            ellipsis="1"
            @click="onLocationChoose"
            title="上报位置"
            :rightText="locationText"
          />
          <uni-list-item
            show-arrow
            clickable
            @click="onPopupOpen"
            title="异常类型"
            :rightText="
              exceptionCheck.length > 0 ? exceptionCheck.join('|') : '请选择'
            "
          />
          <uni-list-item direction="column" title="异常描述">
            <template v-slot:footer>
              <view class="textarea-wrapper">
                <textarea
                  class="textarea"
                  placeholder="请输入异常描述"
                  v-model="anomalyDescription"
                ></textarea>
                <view class="words-count"
                  >{{ anomalyDescription.length }}/50</view
                >
              </view>
            </template>
          </uni-list-item>
          <uni-list-item
            :border="false"
            style="margin-top: -30rpx"
            direction="column"
            title="上传图片（最多6张）"
          >
            <template v-slot:footer>
              <uni-file-picker
                @success="uploadSuccessImg"
                limit="6"
              ></uni-file-picker>
            </template>
          </uni-list-item>
        </uni-list>
      </view>
    </scroll-view>
    <view class="fixbar">
      <button class="button disable" :disabled="!isOk" @click="submit">
        提交
      </button>
    </view>
    <!-- 异常类型弹层 -->
    <uni-popup ref="popup" :mask-click="true" type="bottom">
      <checkbox-group @change="checkBoxSelect" class="checkbox">
        <uni-list class="popup-action-sheet">
          <uni-list-item>
            <template v-slot:header>
              <view class="header">选择类型</view>
            </template>
          </uni-list-item>
          <uni-list-item
            v-for="item in exceptionTypes"
            :key="item"
            :title="item"
          >
            <template v-slot:footer>
              <checkbox
                color="#EF4F3F"
                :value="item"
                :checked="exceptionCheck.includes(item)"
              />
            </template>
          </uni-list-item>
          <uni-list-item>
            <template v-slot:body>
              <button @click="onPopupConfirm" class="button">确定</button>
            </template>
          </uni-list-item>
        </uni-list>
      </checkbox-group>
    </uni-popup>
  </view>
</template>

<style lang="scss" scoped>
  @import './index.scss';
  // 样式  样式穿透 当前界面的样式穿透到子组件中
</style>
