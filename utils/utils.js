export const utils = {
  toast(title = '请求失败', icon = 'none') {
    uni.showToast({
      title,
      duration: 2000,
      icon,
    })
  },
}

uni.utils = utils
