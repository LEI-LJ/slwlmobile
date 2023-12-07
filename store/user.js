import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'userToken',
  () => {
    const token = ref('')

    return {
      token,
    }
  },
  { persist: ['token'] }
)
