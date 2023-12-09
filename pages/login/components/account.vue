<template>
  <uni-forms
    class="login-form"
    ref="formRef"
    :rules="formRules"
    :model="formData"
  >
    <uni-forms-item name="account">
      <input
        v-model="formData.account"
        type="text"
        placeholder="请输入账号"
        class="uni-input-input"
        placeholder-style="color: #818181"
      />
    </uni-forms-item>
    <uni-forms-item name="password">
      <input
        v-model="formData.password"
        type="text"
        placeholder="请输入密码"
        class="uni-input-input"
        placeholder-style="color: #818181"
      />
    </uni-forms-item>
    <button class="submit-button" @click="loginBtn">登录</button>
  </uni-forms>
</template>

<script setup>
  import { useUserStore } from '@/store/user.js'
  import { storeToRefs } from 'pinia'
  import { ref } from 'vue'
  import { accountLogin } from '@/apis/user.js'
  import { onLoad } from '@dcloudio/uni-app'
  const { token } = storeToRefs(useUserStore())
  console.log(token.value)
  // 表单校验规则
  const formRules = {
    account: {
      rules: [
        {
          required: true,
          errorMessage: '请输入账号内容',
        },
        {
          pattern: /^[a-zA-Z0-9]{6,8}$/,
          errorMessage: '用户名规则不正确',
        },
      ],
    },
    password: {
      rules: [
        {
          required: true,
          errorMessage: '请输入密码',
        },
        {
          pattern: /^[0-9]{6}$/,
          errorMessage: '密码规则不正确',
        },
      ],
    },
  }
  const formData = ref({
    account: 'luolei',
    password: '121212',
  })
  const formRef = ref(null)
  // 触发校验

  // 调转到 token失效界面
  const redirectUrl = ref('')
  let type = ''
  onLoad((options) => {
    redirectUrl.value = options.redirectUrl

    type = options.type
    console.log('----redirectUrl,type----', options.redirectUrl, options.type)
  })

  const loginBtn = async () => {
    // 校验成功正常 返回 校验失败 抛出异常

    try {
      await formRef.value.validate()
      console.log(formData.value)
      const res = await accountLogin(formData.value)
      // loginBtn(res)
      // console.log(res.data)
      token.value = res.data
      console.log(redirectUrl.value)
      if (redirectUrl.value) {
        uni[type]({
          url: redirectUrl.value,
        })
      } else {
        uni.switchTab({
          url: '/pages/task/index',
        })
      }
    } catch (e) {
      //TODO handle the exception
      console.log(e)
    }
  }
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
