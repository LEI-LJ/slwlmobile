import { defineStore } from 'pinia'
import { ref } from 'vue'
import { truckRegistration } from '@/apis/task.js'
export const useTaskStore = defineStore('taskStore', () => {
  const recordData = ref({
    id: '',
    startTime: '',
    endTime: '',
    /*** 违章 ***/
    isBreakRules: false,
    breakRulesType: null,
    penaltyAmount: null,
    deductPoints: null,
    breakRulesDescription:'',
    /*** 违章 ***/

    /*** 故障 ***/
    isFault: false,
    faultType: null,
    faultDescription: '',
    faultImagesList: [],
    /*** 故障 ***/

    /*** 事故 ***/
    isAccident: false,
    accidentType: null,
    accidentDescription: '',
    accidentImagesList: [],
    /*** 事故 ***/
  })
  const submit = async () => {
    const res = await truckRegistration(recordData.value)
    console.log(res)
    uni.switchTab({
      url:"/pages/task/index"
    })
  }
  return { recordData, submit }
})
