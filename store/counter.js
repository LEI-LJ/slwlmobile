import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore(
  'counter',
  () => {
    const isNumber = {
      isTrue: true,
    }
    const number = ref(0)
    
    const addNumber = () => {
      isNumber.isTrue = !isNumber.isTrue
      console.log(isNumber.isTrue);
      number.value++
    }
    const subNumber = () => {
      if (number.value > 0) {
        number.value--
      } else {
        uni.utils.toast('不能为负数')
      }
    }
    return {
      addNumber,
      subNumber,
      number,
      isNumber,
    }
  },
  { persist: true }
)
