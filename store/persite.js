import { createPersistedState } from 'pinia-plugin-persistedstate'

export const persistedstate = createPersistedState({
  key: (id) => `__persisted__${id}`,
  storage: {
    getItem(key) {
      return uni.getStorageSync(key)
    },
    setItem(key, value) {
      uni.setStorageSync(key, value)
    },
  },
})
